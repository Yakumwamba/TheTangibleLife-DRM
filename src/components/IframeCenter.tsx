import { Box, Button, Flex, Spacer, Text, Image, Icon, toast, useToast } from '@chakra-ui/react'
import { useEtherBalance, useEthers, } from '@usedapp/core';
import { useCoingeckoPrice } from '@usedapp/coingecko';


import React, { useEffect } from 'react'
import Web3 from 'web3';
import { FiCloudLightning, FiDroplet } from 'react-icons/fi';

export default function IframeCenter() {

    // @ts-ignore
    const { activateBrowserWallet, account, deactivate, chainId, SwitchNetwork } = useEthers();
    const [hasNFT, setHasNFT] = React.useState(false);
    const thetaPrice = useCoingeckoPrice('theta-token', 'usd')
    const toast = useToast()
    function handleConnectWallet() {
        activateBrowserWallet()

        console.log(account);
    }
    useEffect(() => {
        console.log(account, "On Theta Testnet - Chain ID: ", chainId);
        if (account) {
            handleCheckNFT();
        }
        if (chainId !== 365) {

            toast({
                title: 'Testnet Required.',
                description: `Please note that dapp is only available on Theta Testnet.`,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }


    }, [account, hasNFT, chainId])




    const etherBalance = useEtherBalance(account);
    let tangibleABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "baseURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenOfOwnerByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    const tangibleContractAddress = '0x758972ce02de168d11103a473d97545bdd4d087c'
    // const contract = new Contract(tangibleContractAddress, tangibleInterface)
    // const { state, send } = useContractFunction(contract, 'tokenURI')
    /// TangibleAddress 
    const web3 = new Web3('https://eth-rpc-api-testnet.thetatoken.org/rpc')
    const chainID = 361 // for the Theta Mainnet
    // @ts-ignore
    const contract = new web3.eth.Contract(tangibleABI, tangibleContractAddress)


    function handleCheckNFT() {
        // @ts-ignore
        contract.methods.tokenURI(0).call((err, result) => {
            console.log("TokenURI ===>", result,)
        })
        // @ts-ignore
        contract.methods.balanceOf(`${account}`).call((err, result) => {
            if (result > 0) {
                setHasNFT(true)
            }
            console.log(`BalanceOf NFT for account  ${account} ===>`, result)
        })
        // @ts-ignore
        // contract.methods.transferFrom("0x456B02f2BEb7CBd00A9A293de429187e3f110B1B", "0x159536D589b7885c58F83f8D3d9b2326668D6c0a", 0).call((err, result) => { 
        //   console.log("Transfere the NFT to :",  ) 
        // })

        // // @ts-ignore
        // contract.methods.transferFrom("0x456B02f2BEb7CBd00A9A293de429187e3f110B1B", "0x159536D589b7885c58F83f8D3d9b2326668D6c0a",0).call((err, result) => { 
        //   if(err) {
        //     console.log("Error:", err)
        //   } 
        //   console.log("Sending NFT:", result) 
        // })
    }


    return (
        <>
            <Box>
                {(!account && !hasNFT && chainId !== 365) ? <Flex direction={'column'} alignItems={'center'}>
                    <Text fontSize='2xl' fontWeight={'bold'} color={'white'}>TheTangibleLife - NFT-based Video Streaming</Text>
                    <Text fontSize='lg' color={'white'} >This video is only available to NFT owners of TheTangibleLife NFT</Text>
                    <Text fontSize='lg' >To unlock this video, please connect your wallet</Text>
                    <Button onClick={handleConnectWallet} colorScheme={'green'} height="30px" > <Text fontSize='sm' fontWeight={'semibold'} color={'white'}>Connect Wallet</Text> </Button>
                </Flex> : <Flex direction={'column'} alignItems={'center'}>
                    <Text fontSize='2xl' opacity={0.6} fontWeight={'bold'} color={'white'}> You are connected</Text>

                    <Flex direction={'row'} >
                        {/* @ts-ignore */}
                        <Text fontSize='sm' opacity={0.4} fontWeight={'bold'} color={'white'}> {account.slice(0, 6)}...{account.slice(account.length - 4, account.length)}  </Text>
                        <Image borderRadius='full'
                            boxSize='150px' src={`https://robohash.org/${account}`} height={'48px'} width={'48px'} />

                    </Flex>

                    <Spacer mt={'10px'} />
                    {(hasNFT && chainId === 365) ? <Box >
                        <iframe src="https://player.thetavideoapi.com/video/video_i32nq3tn23fia0br5cb4x90ir3"
                            /* @ts-ignore */
                            border="0"
                            width="680px"
                            height="540px"
                            allowFullScreen />

                    </Box> :

                        <Flex alignItems={'center'} direction="column">
                            <Spacer mt={'16px'} />
                            <Text color={'#fff'} fontWeight="bold" fontSize='2xl' >Only NFT owners can watch - TangibleLife</Text>
                            <Spacer mt={'8px'} />
                            <Button textColor={'white'} alignSelf={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' onClick={(e) => {

                            }} >Buy NFT Now</Button>
                            <Spacer mt={'8px'} />
                            <Flex direction={'row'} alignItems={'center'} justifyItems={'center'} >

                                <Text fontSize={'sm'} fontWeight={'semibold'} color={'#fff'}>${thetaPrice}</Text>
                                <Spacer mt={'2px'} />
                                <Image height={5} width={5} borderRadius='full' src='/tfuel.png' />
                            </Flex>
                        </Flex>
                    }

                </Flex>}



            </Box>

        </>
    )
}
