import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

export default function Khalti(){
    let checkout = new KhaltiCheckout({
      // replace this key with yours
      publicKey: 'test_public_key_617c4c6fe77c441d88451ec1408a0c0e',
      productIdentity: "1234567890",
      productName: "beep",
      productUrl: "http://localhost:3001",
      eventHandler: {
        onSuccess(payload) {
          // hit merchant api for initiating verfication
          console.log(payload);
          let data = {
            "token": payload.token,
            "amount": payload.amount
          };
          
          let config = {
            headers: {'Authorization': 'test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5'}
          };
          
          axios.post('https://khalti.com/api/v2/payment/verify/', data, config)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        },
        // onError handler is optional
        onError(error) {
          // handle errors
          console.log(error);
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    });
  return (
    <div>
      <button onClick={()=>checkout.show({amount:1000000000000000000000000})}>Pay Via Khalti</button>
    </div>
  );
}


