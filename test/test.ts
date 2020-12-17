import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import FileComparator from "../src/FileComparator"
import ProgramComparator from "../src/ProgramComparator"
import Result from "../src/Result"
import MyFile from "../src/MyFile";


let p1 = fs.readFileSync("src\\diff1.js")
let p2 = fs.readFileSync("src\\diff2.js")
let program1 = new MyFile("program1",p1,'person1')
let program2 = new MyFile("program2",p2,'person2')

//console.log(program1.getContent().toString());
//console.log(program2.getContent().toString());

//fs.readFileSync("src\\diff2.js")
//fs.readFileSync("src\\diff2.js")
let test1 = 'This is a TEST to see IF THINGS Are CONverted correctLY thisi ab'
let test2 = 'isthisworking'
let ken = 'My name is I study computer science Ken at Northeastern'
let ken2 = 'Northeastern I study computer Ken science at'
let brandon = 'My name I study computer science at Northeastern'

let testseq = [77, 74, 42, 17, 98, 50, 17, 98, 8]
let testseq2 = [77, 74, 42, 17, 98, 50, 17, 98]
let windows = [[77,74,42,17],[74,42,17,98],[42,17,98,50],[17,98,50,17],[98,50,17,98],[50,17,98,8]]
let windows2 = [[77,74,42,17],[74,42,17,98],[42,17,98,50],[17,98,50,17],[98,50,17,98]]

let output = [[17,3],[17,3],[8,3]]


let pro1 = [[756,1],[485,6],[895,23]]
let pro2 = [[245,1],[756,12],[895,32],[895,43]]


//let fc = new FileComparator() 
//fc.build(program1, program2, 6, 6)
let arr1 = [program1]
let arr2 = [program2]

let pc = new ProgramComparator(arr1, arr2)
pc.compareall(5,8)
//console.log(fc.removeWhiteSpace(program1.toString()))

// list of all functions
//build 
//removewhitespace X
//linegrams X
//get line number X
//hash
//winnowing
//findfingerprints
//exactmatch
//compare
//clear
//countlines
//---
//compareAll
//getters


describe("whitebox tests for Comparison", () => {
    const fc = new FileComparator();
  
    it("call removewhiteSpace on regular string", () => {  
      let ken = 'My name is I study computer science Ken at Northeastern';
      let kenremoved = 'mynameisistudycomputersciencekenatnortheastern';
      expect(fc.removeWhiteSpace(ken)).to.equal(kenremoved);
    });
  
    it("call sorter on a space", () => {
      expect(fc.removeWhiteSpace(" ")).to.equal("");
    });

    it("count lines of the given sample program1", () => {
        let program1 = fs.readFileSync("src\\diff1.js")
        expect(fc.countLines(program1.toString())).to.equal(146);
    });

    it("call exactmatch on strings with exact matches", () => {
      let p1 = 'This is a sample program test.';
      let p2 = 'This is a sample program test.'
      expect(fc.exactmatch(p1,p2)).to.equal(true)
    });

    it("call exactmatch on strings with strings with different spacing and Uppercase/Lowercase", () => {
      let p1 = 'This is a sample program  Test.';
      let p2 = 'This is a sample Program test.'
      expect(fc.exactmatch(p1,p2)).to.equal(true)
    });

    it("call line grams on a short program", () => {
      let p1 = 'Sampleprogram\nTest';
      expect(fc.lineGrams(p1,7)).to.eql(['Samplepr','amplepro','mpleprog','pleprogr','leprogra','eprogram','Test'])
    });

    it("call hash on 1 ", () => {
      let p1 = 'Samplepr';
      expect(fc.hash(p1)).to.equal(763433468)
    });

    it("call hash on 2", () => {
      let p1 = 'amplepro';
      expect(fc.hash(p1)).to.equal(748954752)
    });

    it("call hash on 3", () => {
      let p1 = 'mpleprog';
      expect(fc.hash(p1)).to.equal(700767942)
    });

    it("call hash on 4", () => {
      let p1 = 'pleprogr';
      expect(fc.hash(p1)).to.equal(757296911)
    });

    it("call hash on 5", () => {
      let p1 = 'leprogra';
      expect(fc.hash(p1)).to.equal(667370858)
    });

    it("call hash on 6", () => {
      let p1 = 'eprogram';
      expect(fc.hash(p1)).to.equal(723701895)
    });

    it("call hash on 7", () => {
      let p1 = 'Test';
      expect(fc.hash(p1)).to.equal(323498)
    });

    it("call winnowing on a short program", () => {
      let p1 = ['Samplepr','amplepro','mpleprog','pleprogr','leprogra','eprogram','Test']
      expect(fc.winnowing(p1,5)).to.eql([[763433468,748954752,700767942,757296911,667370858],[748954752,700767942,757296911,667370858,723701895],[700767942,757296911,667370858,723701895,323498]])
    });

    /*
    it("call build on a short program", () => {
      let p1 = fs.readFileSync("test\\test1.js")
      let p2 = fs.readFileSync("test\\test2.js")
      let program1 = new MyFile("program1",p1,'person1')
      let program2 = new MyFile("program2",p2,'person2')
      let fc = new FileComparator(); 
      fc.clear(); 
      fc.build(program1, program2, 5, 5); 
      expect(Result.matches).to.deep.equal([
        {
          "endLineA": 54,
          "endLineB": 42,
          "fileAname": "filenameA",
          "fileBname": "fileNameB",
          "hash": "",
          "id": 1,
          "personA": "person1",
          "personB": "person2",
          "startLineA": 54,
          "startLineB": 42,
        }]); 
       

    });
     */

    /*
    it("get line size", () => {
      let p1 = [[777,38],[578,10]]
      let p2 = [[1,8],[2,4],[5,16],[7,12]]
      expect(fc.getlinenumber2(p1,p2)).to.eql([[777,7],[578,2]])
        
    });
    */
    

    /*
    it("calling find fingerprints on a short program", () => {
      //let fc = new FileComparator();
      console.log(fc.lineDictionary);
      
      let p1 = [[763433468,748954752,700767942,757296911,667370858],[748954752,700767942,757296911,667370858,723701895],[700767942,757296911,667370858,723701895,323498]]
      expect(fc.findFingerprints(p1)).to.eql([[667370858,1],[323498,2]])
    });
    */

})
  