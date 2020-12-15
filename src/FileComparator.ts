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


   constructor(f1 :Buffer, f2 :Buffer) {
        this.file1 = f1.toString()
        this.file2 = f2.toString()
   }
    
   //pass in buffers
   //TODO change from Buffer to File (or whatever Sky needs)
   
   //result of comparing 
    build(f1 :Buffer, f2 :Buffer, k :number, w :number) {



        this.file1 = f1.toString()
        this.file2 = f2.toString()

       // let a = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file1), k), w))
       // console.log(a); 
      //  this.clear()
      //  let b = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file2), k), w))


        
        //console.log(b); 
        //let b = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file2), k), w))
        //this.compare(a, b)
        ////////console.log(this.findFingerprints(this.winnowing(this.kgrams(this.preprocess(this.file2), k), w), this.kgram2))

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
                    let match = new Match(id, f1[0], f1[1], f2[1], "person1", "person2"); 
                    Result.matches.push(match)
                    id++; 
                   
                }
            }
        }

        //console.log(Result.matches); 

    }
    
    
    
    removeWhiteSpace(program: string): string {
        //return program.toLowerCase().replace(/\s/g, "");
        
        return program.toLowerCase().replace(/ +?/g, '')
    }
    
    //removes comments from a file
    preprocess(program: string): string {
        let arr = program.split("\n")
        let result = ""
        for(let line of arr) {
            if(line.includes('//')) {
                result += line.substring(0,line.indexOf("//"))
                result += "\n"
             }
            else {
              result += line;
              result += "\n"
            }
        }
        
        //removes white space and converts to lowercase
        result = this.removeWhiteSpace(result)
        //takes out all the block comments
        while(result.indexOf('/*')!= -1) {
            let i = result.indexOf('/*')
            let j = result.indexOf('*/')
            result = result.substring(0,i) + result.substring(j + 2,result.length)
        }
    
        return result
    }
    
     kgrams(program:string, k:number): Array<String> {
        let result = Array<String>();
        let end = k
        let start = 0
        while(end < program.length + 1) {
    
            if(end > program.length) {
                result.push(program.substring(start,program.length))
            }
        
             result.push(program.substring(start,end))
             start += 1
             end += 1
        
        }
    
        return result
    }

    lineGrams(program:string, k:number) :Array<string> {
        
        let result :Array<string> = []
        let lineno :number = 1;
        let insideComment = false;  

    
        for(let line of program.split("\n")) {
            if(line.length < k) { 
                
            }
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
            let temp = []

            while(!insideComment && end < line.length - 1) { 
               
                
                if(end > line.length) {
                    result.push(line.substring(start, line.length))
                    temp.push(line.substring (start, line.length))
                }

                result.push(line.substring(start, end))
                temp.push(line.substring(start, end))
                start += 1
                end += 1
                
                this.lineDictionary[lineno] = temp; 
    
            }
            lineno++; 
        
    }
        ////////console.log(this.lineDictionary)
        this.orig = result;
        for(let i = 0; i < this.orig.length; i++) {
            this.origHashed.push(this.hash(this.orig[i]))
        }
        ////////console.log("Result of original winnowing");

       // ////////console.log(this.orig)

        ////////console.log("Result of original winnowing as hash");

        ////////console.log(this.origHashed)

        return result; 
    }
    
    
    
    hash(text:String):number {
        let hashcode = 0;
        let basis = 7
        for(let i=0;i<text.length;i++) {
            let code = text.charCodeAt(i);
            hashcode += basis * code
        }
    
        return hashcode
    }
    
    winnowing(arr:Array<String>,size:number):Array<Array<number>> {
        let hasharray = []
        let result = Array<Array<number>>()
        for(let el of arr) {
    
            hasharray.push(this.hash(el))
            this.hashDictionary[this.hash(el)] = el;
            
            
        }
        let start = 0
        let end = size
        //////////console.log(hasharray)
    
       // ////////console.log(hasharray[0])
        
        while(end != arr.length + 1){
            let temp = []
            for(let i = start;i < end;i++) {
                temp.push(hasharray[i])
            }
            result.push(temp)
            start++
            end++
           
       }
      // ////////console.log("result of winnowing the original hash")
      // ////////console.log(result)
        return result
    
    }
    

    //
    
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

        //console.log("fingerprints after we look for the indices in the original hash")
        //console.log(fingerprints)

        this.getLineNo(fingerprints)




        

        
    
    
        
    
        //Approach 1
        //map the hash back to the original string [done]
        //have a method to return the line number in which it appears by going through the original file 
        //add the line number to the fingerprint
    
    
        //Approach 2
        //keep line numbers in kgrams 
        //give each hash a line number associated with it
    
    
        //Approach 3
        //for every line get the first and last kgrams
        //convert to hash
        //assign line number
        //find those hash in the list of hashes 
    
    
    
        return fingerprints
        
    }

    getLineNo(fingerprints :Array<Array<number>>) {
        //stores line number and how many things are associated with that line number
        let arr = Array[0]; //index is the line,storing # of items in each line 
        let numberOfElements = 0; 
        let j = 0; 
        for(let key in this.lineDictionary) {
        
            for(let substr in this.lineDictionary[key]) {
                 
               
                if(j >= fingerprints.length) {
                    break; 
                }

                //////////console.log(fingerprints[j][1])
                if(numberOfElements === fingerprints[j][1]) {
                    fingerprints[j][1] = parseInt(key, 10); 
                    j++; 
                }
                numberOfElements++; 
                //////////console.log("a")
                
                
            }
           // this.arr.push(value.size)
         
        }

        //////////console.log(fingerprints); 

        
    }

    
    
    /*
    export function reorderedMatch(program1 :String, program2 :String): Boolean {
        let match = 0; 
        let out1 = babel.transform(program1, {
            plugins: [parser1]
          });
        
          let out2 = babel.transform(program2, {
            plugins: [parser2]
          });
          
          if(Store.p1.length !== Store.p2.length) {
              return false; 
          }
          
          for(let func1 of Store.p1) {

              for(let func2 of Store.p2) {
                if(func1 === func2) {
                //////console.log("Match found at " + func1 + " and " + func2)
                match++; 
                }
              }
          }
    
          return match === Store.p1.length; 

          
       
    
    
    
    }
    */
    
    


}
export default FileComparator