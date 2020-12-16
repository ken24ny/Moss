import { removeWhiteSpace, preprocess,kgrams,winnowing,findmin} from "../src/compare";
import * as fs from 'fs';

import { compare } from "../src/compare"
import FileComparator from "../src/FileComparator"
import Result from "../src/Result"
let program1 = fs.readFileSync("src\\diff1.js")
let program2 = fs.readFileSync("src\\diff2.js")
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
let fc = new FileComparator() 
fc.build(program1, program2, 6, 8)
//console.log(fc.removeWhiteSpace(program1.toString()))


//Result.addMatchesToJSON()
//console.log(Result.matchesJSON)
//fc.build(program1, program2, 5, 1)

//console.log(fc.removeWhiteSpace(program1.toString()))
//console.log(fc.lineGrams(fc.removeWhiteSpace(program1.toString()),5))


//let a = fc.findFingerprints(fc.winnowing(fc.lineGrams(fc.removeWhiteSpace(program1.toString()),15),15))
//let b = fc.findFingerprints(fc.winnowing(fc.lineGrams(fc.removeWhiteSpace(program2.toString()),15),15))

//console.log(fc.compare(a,b))



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
