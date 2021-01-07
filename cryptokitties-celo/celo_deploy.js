const Kit = require('@celo/contractkit')

const Ownable = require('./build/contracts/Ownable.json')
// const ERC721 = require('./build/contracts/ERC721.json')
// const GeneScienceInterface = require('./build/contracts/GeneScienceInterface.json')
const KittyAccessControl = require('./build/contracts/KittyAccessControl.json')
const KittyBase = require('./build/contracts/KittyBase.json')
const ERC721Metadata = require('./build/contracts/ERC721Metadata.json')
const KittyOwnership = require('./build/contracts/KittyOwnership.json')
const KittyBreeding = require('./build/contracts/KittyBreeding.json')
const ClockAuctionBase = require('./build/contracts/ClockAuctionBase.json')
const Pausable = require('./build/contracts/Pausable.json')
// const ClockAuction = require('./build/contracts/ClockAuction.json')
// const SiringClockAuction = require('./build/contracts/SiringClockAuction.json')
// const SaleClockAuction = require('./build/contracts/SaleClockAuction.json')
const KittyAuction = require('./build/contracts/KittyAuction.json')
const KittyMinting = require('./build/contracts/KittyMinting.json')
const KittyCore = require('./build/contracts/KittyCore.json')

const contracts = [Ownable, KittyAccessControl, KittyBase, ERC721Metadata, KittyOwnership, KittyBreeding, ClockAuctionBase, Pausable, KittyAuction, KittyMinting, KittyCore]

const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')
const getAccount = require('./getAccount').getAccount

async function awaitWrapper () {
  const account = await getAccount()

  kit.addAccount(account.privateKey) // this account must have a CELO balance to pay transaction fees

  const receipts = await contracts.map(async contract => {
    const tx = await kit.sendTransaction({
      from: account.address,
      data: contract.bytecode
    })

    const receipt = await tx.waitReceipt()

    return receipt
  })

  return receipts
}

awaitWrapper().then(receipts => console.log('All Receipts: ', receipts))
