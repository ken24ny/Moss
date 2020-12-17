import Match from "./Match"
class Result {


    static matches = Array<Match>();
    static matchesJSON = Array<JSON>(); 


    /**
     * created the array of JSON that will be sent to the frontend
     */
   static addMatchesToJSON() {
        for(let match of Result.matches) {
            let output :JSON = match.convertJSON();
            Result.matchesJSON.push(output); 

        }
    }


}
export default Result