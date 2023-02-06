import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text } from '@chakra-ui/react'
function ReportAnalytics() {
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))' gap='40px' marginBottom='20px' alignItems='center'>
            <Card
                borderWidth="1px"
                boxShadow='md'
                borderColor='gray.300'
                rounded='lg'
                backgroundColor='gray.50'

                // p={5}
                style={{ padding: '20px', paddingLeft: '30px', zIndex: '-1' }}
            >
                <CardHeader style={{ marginBottom: '5px' }}>
                    <Heading size='md' style={{ fontSize: '25' }} fontWeight='large'>Total Sales</Heading>
                </CardHeader>
                <CardBody style={{ marginBottom: '5px' }}>
                    <Text fontWeight='medium' fontSize='xl' color='indigo' >$15,000</Text>
                    <Text fontSize='sm' color='gray.500'>Last Month</Text>
                </CardBody>
                <CardFooter style={{ marginBottom: '5px' }}>
                    <Button variantColor='green' size='sm'>View here</Button>
                </CardFooter>
            </Card>

            <Card
                borderWidth="1px"
                boxShadow='md'
                borderColor='gray.300'
                rounded='lg'
                backgroundColor='gray.50'
                // p={5}
                style={{ padding: '20px', paddingLeft: '30px', overflow: 'wrap', zIndex: '-1' }}
            >
                <CardHeader style={{ marginBottom: '5px' }}>
                    <Heading size='md' style={{ fontSize: '25' }} fontWeight='large'>Inventory </Heading>
                </CardHeader>
                <CardBody style={{ marginBottom: '5px' }}>
                    <Text fontWeight='medium' fontSize='xl' color='indigo' >50</Text>
                    <Text fontSize='sm' color='gray.500'>Items</Text>
                </CardBody>
                <CardFooter style={{ marginBottom: '5px' }}>
                    <Button variantColor='green' size='sm'>View here</Button>
                </CardFooter>
            </Card>

            <Card
                borderWidth="1px"
                boxShadow='md'
                borderColor='gray.300'
                rounded='lg'
                backgroundColor='gray.50'
                // p={5}
                style={{ padding: '20px', paddingLeft: '30px', zIndex: '-1' }}
            >
                <CardHeader style={{ marginBottom: '5px' }}>
                    <Heading size='md' style={{ fontSize: '25' }} fontWeight='large'>Stock Available </Heading>
                </CardHeader>
                <CardBody style={{ marginBottom: '5px' }}>
                    <Text fontWeight='medium' fontSize='xl' color='indigo' >50</Text>
                    <Text fontSize='sm' color='gray.500'>Items</Text>
                </CardBody>
                <CardFooter style={{ marginBottom: '5px' }}>
                    <Button variantColor='green' size='sm'>View here</Button>
                </CardFooter>
            </Card>


        </SimpleGrid>

    )
}

export default ReportAnalytics
