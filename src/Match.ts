class Match {

    id :number 
    hash :string  //change this back dude 
    startLineA :number;
    startLineB :number;
    endLineA :number;
    endLineB :number;
    personA :string 
    personB :string 

    constructor(id, hash, startLineA,  endLineA, startLineB, endLineB, personA, personB) {
        this.id = id; 
        this.hash = hash; 
        this.startLineA = startLineA; 
        this.startLineB = startLineB; 
        this.endLineA = endLineA; 
        this.endLineB = endLineB; 
        this.personA = personA
        this.personB = personB 
    }

    convertJSON() {
        let output: JSON;
        let obj :any = 
        {
        "id": this.id,
        "match": 
        [
            {"fileName": "this is where we put name 1", "startLine": this.startLineA, "endLine" : this.endLineA},
            {"fileName": "this is where we put name 2", "startLine": this.startLineB, "endLine" : this.endLineB},
        ]
        }
        output = <JSON>obj;
        return output; 
    }
     

    
}
export default Match 