const { assert } = require("chai")
const {ethers} = require("hardhat")

// describe("Election", () => {})

const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("Election", function () {
  let ElectionFactory
  let election
  beforeEach(async function() { 
     ElectionFactory = await ethers.getContractFactory("Election")
     election = await ElectionFactory.deploy()
  })

  //we can use it.only() if we want to run only one specific test from all
  //or run yarn hardhat test --grep keyword
  it("should start with 0 candidates", async function() {
    const currentCandidateNumber = await election.candidatesCount()
    const expectedNumber = "0"
    //assert
    //expect

    assert.equal(currentCandidateNumber.toString(),expectedNumber)
  })

  it("should update the number of candidates when we add a candidate to the election", async function() {
    const expectedCandidateNumber = "1"
    const transactionResponse = await election.addCandidate(5,"candidate4","party4") 
    await transactionResponse.wait(1)

    const currentCandidateNumber = await election.candidatesCount()
    assert.equal(currentCandidateNumber.toString(), expectedCandidateNumber)
  })
  
})