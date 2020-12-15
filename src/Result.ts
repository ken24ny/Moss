import Match from "./Match"
class Result {


    static matches = Array<Match>();
    static matchesJSON = Array<JSON>(); 


   static addMatchesToJSON() {
        for(let match of Result.matches) {
            let output :JSON = match.convertJSON();
            Result.matchesJSON.push(output); 

        }
    }


}
export default Result