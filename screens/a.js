// Buffer string_to_send[]
// (BLE communication: only 20 Bytes at a time)

// for(;;)
//     string_to_send
//     let extracted_string
//     //20 bytes a time
//     BLEManger.write(;;extracted_string){

//     }
//     string_to_send.pop(extracted_string)


// Protocol

// database : questionID (NoSQL?)
//                      
//            foreign key?(X) 

// SingleChoice: 12 
// MultiChoice : 12,13,15 
// Yes/No      : YNYNYYYNNYY 
let text_to_send_buffer = '1234567890abcdefghijk-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z'
text_to_send_buffer = text_to_send_buffer.slice(0, 20)
console.log(text_to_send_buffer)
text_to_send_buffer.slice(0, 20)
console.log(text_to_send_buffer)
text_to_send_buffer.slice(0, 20)
text_to_send_buffer.slice(0, 20)
text_to_send_buffer.slice(0, 20)
console.log(text_to_send_buffer)
