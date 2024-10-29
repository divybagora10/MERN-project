db.createCollection("fiction",{
    validator :{
        $jsonSchema:{
            required :['name' , 'age'],
            properties :{
                name : {
                    bsonType: 'string',
                    description : "name is required"
                },
                price :{
                    bsonType : 'number',
                    description : "age is required"
                }
            }
        }
    },
    validationAction : "error"
})