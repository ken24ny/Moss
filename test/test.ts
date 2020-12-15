import { removeWhiteSpace, preprocess,kgrams,winnowing,findmin} from "../src/compare";
import * as fs from 'fs';

import { compare } from "../src/compare"
import FileComparator from "../src/FileComparator"

let program1 = fs.readFileSync("src\\test2.js")
let program2 = fs.readFileSync("src\\test.js")
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


//console.log(compare(pro1, pro2))
let fc = new FileComparator(program1, program2)//.build(program1, program2, 10, 6)
console.log(fc.winnowing(fc.lineGrams(fc.removeWhiteSpace(fc.file1), 5), 4)); 
console.log(fc.findFingerprints(fc.winnowing(fc.lineGrams(fc.removeWhiteSpace(fc.file1), 10), 6)));  
fc.clear(); 
console.log(fc.findFingerprints(fc.winnowing(fc.lineGrams(fc.removeWhiteSpace(fc.file2), 5), 4))); 





//simpl     simp impl      [1,2,3][2,3,4][3,4,5]...[8,9,1]   1,3 4    
//sim       sim
//simple    simp impl mple
//simple    simp impl mple 
//test1     test est1                      8 /10
 
//simple    simp impl mple  [1,2,3][2,3,4][3,4,5]...[6,7,8]   1 2 4 
//test2      test est2




//console.log(program1.toString())

//console.log(removeWhiteSpace('This is a TEST to see IF THINGS Are CONverted correctLY'))


//console.log(removeWhiteSpace(program1.toString()))

//console.log(reorderedMatch(program1.toString(), program2.toString()))

//console.log(preprocess(program1.toString()))

//console.log(kgrams(preprocess(program1.toString()),5))



//console.log(kgrams(preprocess(ken2),5))

//console.log(kgrams(preprocess(brandon),5))
//console.log(winnowing(kgrams(preprocess(program1.toString()),5),4))
/*
console.log(winnowing(kgrams(preprocess(brandon),5),4))
console.log('/////')
console.log(winnowing(kgrams(preprocess(ken2),5),4))
*/

    
  
// 3101
// 3024
// 2996
