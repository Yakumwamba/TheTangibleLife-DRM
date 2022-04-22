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



const id = process.env.thetaID
const secrete = process.env.thetaSecrete
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
        'x-tva-sa-id': `${id}`,
        'x-tva-sa-secret': `${secrete}`
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
