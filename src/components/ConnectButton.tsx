import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance, useContractFunction} from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import Web3 from 'web3'
type Props = {
  handleOpenModal: any;
};
// @ts-ignore
export default function ConnectButton({ handleOpenModal , handleConnectWallet}) {
  const { activateBrowserWallet, account } = useEthers();


  function generateEmbedCode() {
    // const embedCode = `<iframe src="https://thetatoken.org/tangibles/embed/${tangibleContractAddress}" width="100%" height="600px" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>`
    // setEmbedCode(embedCode)
    console.log("generating embed code")

    var options = {
      'method': 'POST',
   
      'headers': {
        'x-tva-sa-id': 'srvacc_bskvbccj4far1na8eic0ij7r9',
        'x-tva-sa-secret': 'z8czbpj3vjztgut9tqnspestygf0abz6'
      }
    };
    fetch( 'https://api.thetavideoapi.com/upload', options).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    });
  }
  
// @ts-ignore
function onChangeFile(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)



  reader.onload = () => {
    // const buffer = Buffer.from(reader)
    console.log("LOade a file")
    // // @ts-ignore
    // contract.methods.mint(account, buffer).send({ from: account, gas: 1000000 })
  }
  reader.onloadend = () => {
    console.log("Loaded a file")
  }
 

}

// @ts-ignore


// uploading a video to theta


// create_time: "2022-04-20T23:02:21.618Z"
// id: "upload_92v9tca6u7fr4p4xnr89987bm"
// presigned_url: "https://storage.googleapis.com/files.thetavideoapi.com/srvacc_bskvbccj4far1na8eic0ij7r9/upload_92v9tca6u7fr4p4xnr89987bm?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=prod-tva-dispatcher-sa%40prod-theta-video-api.iam.gserviceaccount.com%2F20220420%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220420T230221Z&X-Goog-Expires=901&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=5a9e98fbfa4d81e6feeaa0bd876cea263ed184982ae14700bcf328b00a879103aff918b6bc555ed49b1f26013720d7545a8ea4337583b17edd4563de994ebe03461da08d20838c2990e221fde1676734ef9380daf68e2830d5f4b8588f421230108d9087083a15e3a8999bee5963793f39e16d0fd4f8a38499d9bad31a75afc93147c16ab822658e772eadfed51c649efe1341e2e242f5b908525a6e59f3ad17731347e0ed91fea12960b517302475ff8e16c3eea78c100ff7152e34296c287ce1422056d5734cd0ecb888809e9b8d4e9f6e67189981fe249f86b41edd0315514732091d83831b699cd03755063482d3dd86b4b914a2613ec3d34f24ef8bcaac"
// presigned_url_expiration: "2022-04-20T23:17:21.618Z"
// presigned_url_expired: false
// service_account_id: "srvacc_bskvbccj4far1na8eic0ij7r9"
// update_time: "2022-04-20T23:02:21.618Z"



// curl --location --request POST 'https://api.thetavideoapi.com/video' \
// --header 'x-tva-sa-id: srvacc_bskvbccj4far1na8eic0ij7r9' \
// --header 'x-tva-sa-secret: z8czbpj3vjztgut9tqnspestygf0abz6' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "source_upload_id": "upload_92v9tca6u7fr4p4xnr89987bm",
//     "playback_policy": "public"
// }'

// curl --location --request GET 'https://api.thetavideoapi.com/video/video_sizgud9uak1se135j2uixpzc17' \
// --header 'x-tva-sa-id: srvacc_bskvbccj4far1na8eic0ij7r9' \
// --header 'x-tva-sa-secret: z8czbpj3vjztgut9tqnspestygf0abz6'


  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
     
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to a wallet
    </Button>
  );
}
