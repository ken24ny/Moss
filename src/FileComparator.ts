import * as fs from 'fs';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import Result from "./Result"
import Match from './Match';
import MyFile from "./MyFile"
class FileComparator {
    


   //original list of substr from winnowing program 
   private orig = Array<string> ()

   //original list of substr from winnowing program as hash
   private origHashed = Array<number>()

   private file1 :string 
   private file2 :string

   private kgram1 :number[]
   private kgram2 :number[]
   hashDictionary = {} 
    lineDictionary = {}

   //pass in buffers
   //TODO change from Buffer to File (or whatever Sky needs)
   
   //result of comparing 
   public build(f1 :MyFile, f2 :MyFile, k :number, w :number) {

        this.file1 = f1.getContent().toString()
        this.file2 = f2.getContent().toString()
        //console.log(this.file1)
        //console.log(this.file2)
        if(this.exactmatch(this.file1, this.file2)) {
    
            
            let match = new Match(1, 1, 1, this.countLines(this.file1), 1, this.countLines(this.file2), f1.getSubmitter(), f2.getSubmitter(), f1.getName(), f2.getName())
            Result.matches.push(match)
            
        }
        else {

        let a = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file1), k), w))
        let b = this.findFingerprints(this.winnowing(this.lineGrams(this.removeWhiteSpace(this.file2), k), w))

        this.compare(a, b)
        //console.log(this.orig)
        //console.log(this.lineDictionary)
        }
    }

    countLines(file) {
        return file.split("\n").length; 

    }

    /*
    * Function which clears everything
    */
    public clear() {
        this.hashDictionary = {}
        this.lineDictionary = {}
        this.kgram1 = []; 
        this.kgram2 = []; 
        this.orig = []; 
        this.origHashed = []; 
        Result.matches = []; 
    }
    
    
    public getOrigLine(file :string, lineNo :number) {
        let filearr = file.split("\n"); 
        for(let i = 0; i < filearr.length; i++) {
            if(i == lineNo - 1) {
                return filearr[i]; 
            }
        }
        return ""; 
    }
    //hashcode
    //get substr from hashcode 
    //for line in origfile 
    //if line includes "//"
    //line = line.substring(0, line.indexOf("//")); 
    //if line contains targetSubStr 
    //remove the substring from the original file at that particular line and update our copy of the original file (to avoid repetitions)
    //return line number  
    compare(fingerprints1 :Array<Array<number>>, fingerprints2 :Array<Array<number>>) {
        let id = 1; 
        for(let f1 of fingerprints1) {
            for(let f2 of fingerprints2) {
                //let cond1 = this.getOrigLine(this.file1, f1[1]).includes(this.hashDictionary[f1[0]])
                //let cond2 = this.getOrigLine(this.file2, f2[1]).includes(this.hashDictionary[f2[0]])
                if(this.hashDictionary[f1[0]] === this.hashDictionary[f2[0]]) {
                    //console.log(f1 + " " + f2)
                    
                    let match = new Match(id, this.hashDictionary[f1[0]], f1[1], f1[1], f2[1], f2[1], "person1", "person2","filenameA",'fileNameB'); 
                    if(!match.hash.includes("\r")) {
                    Result.matches.push(match)
                    id++; 
                    }
                 

                   
                }
            }
        }
        //console.log(this.hashDictionary)
        
        //console.log(Result.matches)
       // console.log(this.linesize(this.lineDictionary))
        return Result.matches

    }

    /*
    *  Checks if the two programs are a exact match
    */
    public exactmatch(program1: string,program2: string): Boolean {
        return this.removeWhiteSpace(program1) === this.removeWhiteSpace(program2);
    }
    
    
    
    /*
    *  Removes the whitespace from the sting
    */
    public removeWhiteSpace(program: string): string {
        
        return program.toLowerCase().replace(/ +?/g, '')
    }

    /*
    *
    */
    public lineGrams(program:string, k:number) :Array<string> {
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
    
    
    /*
    * Creates a hashcode from string
    */
    public hash(text:String):number {
        let hashcode = 0;
        let basis = 7
        for(let i=0;i<text.length;i++) {
            let code = text.charCodeAt(i);
            hashcode += Math.pow(basis,i+1) * code
        }

        this.hashDictionary[hashcode] = text; 
        
        return hashcode
    }
    
    /*
    * Creates the winnowing
    */
    public winnowing(arr:Array<String>,size:number):Array<Array<number>> {
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

    //
    public linesize(linedict: Object) {
        let result = Array<Array<number>>()
        for(let key in linedict) {
            let size = linedict[key].length
            result.push([Number(key),size])
        }

        return result
    } 
    
    //selet the minimum of fingerprints in window
    public findFingerprints(windows: Array<Array<number>>) : Array<Array<number>> {
        let tempmin = 0
        //object key -> [value,index]
        let fingerprints = Array<Array<number>>()
        
        let result = Array<number>()
        for(let window of windows) {
           
            let tempmin = Math.min(...window)
            let index = window.lastIndexOf(tempmin)
            
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
            //console.log(this.hashDictionary[(fingerprints[i][0])],index)
            saveIndex = index;
            
        }
      
        this.origHashed = []; 
        this.getLineNo(fingerprints)
        //this.getlinenumber2(fingerprints,this.linesize(this.lineDictionary))
      
        return fingerprints

    }

    //[XXX,38]
    //[1,8][2,4][5,16][7,12] linesize
    public getlinenumber2(fingerprints :Array<Array<number>>,linesize :Array<Array<number>>) {
        let result = 0
        let j = 0

        while(j < fingerprints.length) {
        for(let sizelength of linesize) {
           // if(j > fingerprints.length) {
           //     break;
           // }
        
            result += sizelength[1]
            if(fingerprints[j][1] <= result) {
                    //returns the line number of the first fingerprint that we have
                    fingerprints[j][1] = sizelength[0]
                    result = 0
                    j++
                    break;
             }

            }
        }
            //return fingerprints;
        }


    

    //converts the fingerprints index in the original list of hash lists to the actual position in the program
    public getLineNo(fingerprints :Array<Array<number>>) {
        let numberOfElements = 0; 
        let j = 0; 
        for(let key in this.lineDictionary) {
        
            for(let substr in this.lineDictionary[key]) {
                 
               
                if(j >= fingerprints.length) {
                    break; 
                }

                if(numberOfElements === fingerprints[j][1]) {
                    fingerprints[j][1] = Number(key); 
                    j++; 
                }
                numberOfElements++; 
                
            }
        }
    }
}


export default FileComparator