import * as fs from 'fs';
import traverse from "babel-traverse";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import Result from "./Result"
import Match from './Match';
class FileComparator {
    

   // let x = 0 // removes all white space from a string of programs and coverts to lowercase
    
   // let hashDictionary = {}
   //original list of substr from winnowing program 
    orig = Array<string> ()

    //original list of substr from winnowing program as hash
    origHashed = Array<number>()

   public file1 :string 
   public file2 :string

   kgram1 :number[]
   kgram2 :number[]
   hashDictionary = {} 
   lineDictionary = {}

   //[98 47 17 48 569 ] entire program
   //[[1 24 2 4 ],[ 1 2 4 5 2],1 2 4 6 7[],[5 7 8 ]]
   //1 4 5
   // index of 3 6 9
   //dictionary that stores [1, [hidf , ndndd, dskn]],[2,[]hdhsi cdhscn csk]  ... 


   /*
   constructor(f1 :Buffer, f2 :Buffer) {
        this.file1 = f1.toString()
        this.file2 = f2.toString()
   }
   */
    
   //pass in buffers
   //TODO change from Buffer to File (or whatever Sky needs)
   
   //result of comparing 
    build(f1 :Buffer, f2 :Buffer, k :number, w :number) {

       

        this.file1 = f1.toString()
        this.file2 = f2.toString()
        if(this.exactmatch(this.file1, this.file2)) {
            
            let match = new Match(1, 1, 1, this.countLines(this.file1), 1, this.countLines(this.file2), "bob", "alice")
            Result.matches.push(match)
            //console.log(Result.matches)
            
        }
        else {

        let a = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file1), k), w))
    

       // console.log(a); 
      //  this.clear()
      //  let b = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file2), k), w))


        
        //console.log(b); 
        let b = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file2), k), w))
        this.compare(a, b)
        ////////console.log(this.findFingerprints(this.winnowing(this.kgrams(this.preprocess(this.file2), k), w), this.kgram2))
        }
    }

    countLines(file) {
        return file.split("\n").length - 1; 

    }

    clear() {
        this.hashDictionary = {}
        this.lineDictionary = {}
        this.kgram1 = []; 
        this.kgram2 = []; 
        this.orig = []; 
        this.origHashed = []; 
    }
    
    //for line in original file 
    //if(line.substring(0, 2) == "//")  
    //ignore
    //
    
    
    //hashcode
    //get substr from hashcode 
    //for line in origfile 
    //if line includes "//"
    //line = line.substring(0, line.indexOf("//")); 
    //if line contains targetSubStr 
    //remove the substring from the original file at that particular line and update our copy of the original file (to avoid repetitions)
    //return line number 
    //lineno++ 
    compare(fingerprints1 :Array<Array<number>>, fingerprints2 :Array<Array<number>>) {
        let id = 1; 
        for(let f1 of fingerprints1) {
            for(let f2 of fingerprints2) {
                if(f1[0] === f2[0]) {
                    //console.log(f1 + " " + f2)
                    
                    let match = new Match(id, this.hashDictionary[f1[0]], f1[1], f1[1], f2[1], f2[1], "person1", "person2"); 
                    if(!match.hash.includes("\r")) {
                    Result.matches.push(match)
                    id++; 
                    }
                 

                   
                }
            }
        }
        console.log(this.hashDictionary)
        console.log(Result.matches)
        return Result.matches

    }

     exactmatch(program1: string,program2: string): Boolean {
        return this.removeWhiteSpace(program1) === this.removeWhiteSpace(program2);
    }
    
    
    
    
    removeWhiteSpace(program: string): string {
        //return program.toLowerCase().replace(/\s/g, "");
        
        return program.toLowerCase().replace(/ +?/g, '')
    }
    lineGrams(program:string, k:number) :Array<string> {
        this.lineDictionary = {}; 
        
        let result :Array<string> = []
        let lineno :number = 1;
        let insideComment = false;  

    
        for(let line of program.split("\n")) {
           
            let temp = []

            if(line.length < k) { 
                result.push(line.substring(0, line.length + 1))
                temp.push(line.substring (0, line.length + 1))
            }
            else {
            let end = k
            let start = 0
            if(line.includes("//")) {
                line = line.substring(0, line.indexOf("//"))

            }
            if(line.includes("/*")) {
                line = line.substring(0, line.indexOf("/*"))
               
                insideComment = true; 
            }
            //TODO fix single line problem

           
            if(line.includes("*/")) {
                line = line.substring(line.indexOf("*/"), line.length + 1); 
                insideComment = false;
            }

            if(insideComment) {
            }
            while(!insideComment && end < line.length) { 
              
                
                if(end > line.length) {
                    result.push(line.substring(start, line.length + 1))
                    temp.push(line.substring (start, line.length+ 1))
                   
                }

                result.push(line.substring(start, end + 1))
                temp.push(line.substring(start, end + 1))
                start += 1
                end += 1
                
                this.lineDictionary[lineno] = temp; 
    
            }
            
        }
        lineno++;  
        
    }
        this.orig = result;
        for(let i = 0; i < this.orig.length; i++) {
            this.origHashed.push(this.hash(this.orig[i]))
        }


        
        

        return result; 
    }
    
    
    
    hash(text:String):number {
        let hashcode = 0;
        let basis = 7
        for(let i=0;i<text.length;i++) {
            let code = text.charCodeAt(i);
            hashcode += Math.pow(basis,i+1) * code
        }

        this.hashDictionary[hashcode] = text; 
        
        return hashcode
    }
    
    winnowing(arr:Array<String>,size:number):Array<Array<number>> {
        let hasharray = []
        let result = Array<Array<number>>()
        for(let el of arr) {
    
            hasharray.push(this.hash(el))
            
            
        }
        let start = 0
        let end = size
        
        while(end != arr.length + 1){
            let temp = []
            for(let i = start;i < end;i++) {
                temp.push(hasharray[i])
            }
            result.push(temp)
            start++
            end++
           
       }
       
        return result
    
    }
    

    
    
    //selet the minimum of fingerprints in window
    findFingerprints(windows: Array<Array<number>>) : Array<Array<number>> {
        let tempmin = 0
    

        
        //object key -> [value,index]
        let fingerprints = Array<Array<number>>()
        
        let result = Array<number>()
        for(let window of windows) {
           
            let tempmin = Math.min(...window)
            let index = window.lastIndexOf(tempmin)
            
            

            //0
            // i = 0
            // i ++
            
            if(fingerprints.length == 0) {
                fingerprints.push([tempmin,index])
            }
            else if(fingerprints[fingerprints.length - 1][0] == tempmin) {
                    if(fingerprints[fingerprints.length - 1][1] <= index) {
               
                        fingerprints.push([tempmin,index])
              }
    
              }
            else {
                fingerprints.push([tempmin,index])
            }
               
        }

        let saveIndex = -1; 
        for(let i = 0; i < fingerprints.length; i++) {
            
            let index = this.origHashed.indexOf(fingerprints[i][0], saveIndex + 1)
            fingerprints[i][1] = index; 
            saveIndex = index;
            
        }
        
      
        this.origHashed = []; 
      
        

        this.getLineNo(fingerprints)
        //console.log(fingerprints)




        

        
    
    
        
    
      
        return fingerprints

    }

    getLineNo(fingerprints :Array<Array<number>>) {
        let numberOfElements = 0; 
        let j = 0; 
        for(let key in this.lineDictionary) {
        
            for(let substr in this.lineDictionary[key]) {
                 
               
                if(j >= fingerprints.length) {
                    break; 
                }

                if(numberOfElements === fingerprints[j][1]) {
                    fingerprints[j][1] = parseInt(key, 10); 
                    j++; 
                }
                numberOfElements++; 
                
                
            }
         
        }


    }

    
  
    


}
export default FileComparator