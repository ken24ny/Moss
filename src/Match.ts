class Match {

    id :number 
    hash :number 
    lineA :number;
    lineB :number;
    personA :string 
    personB :string 

    constructor(id, hash, lineA, lineB, personA, personB) {
        this.id = id; 
        this.hash = hash; 
        this.lineA = lineA; 
        this.lineB = lineB; 
        this.personA = personA
        this.personB = personB 
    }
     

    
}
export default Match 