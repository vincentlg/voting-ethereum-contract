var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = applicationForm

function applicationForm (BallotContract) {
  return bel`
  <div class=${css.formMain}>
    <div class=${css.formTitle}>Application form</div>
    <div class=${css.formSubtitle}>Proposal title/description/address</div>
    <div class=${css.formTip}>Fill out the form and click submit!</div>
    <div class=${css.formContainer}>
      <div class=${css.formField}>
        <div class=${css.formFieldText}>Proposal title</div>
        <input class=${css.formFieldInput} id="title">
      </div>
      <div class=${css.formField}>
        <div class=${css.formFieldText}>Description</div>
        <textarea class=${css.formFieldInput} id="description"></textarea>
      </div>
      <div class=${css.formField}>
        <div class=${css.formFieldText}> Ethereum public key</div>
        <input class=${css.formFieldInput} id="address">
      </div>
      <div class=${css.submitContainer}>
        <div class=${css.submitText}>By clicking submit your proposal will be immediatelly published!</div>
        <div class=${css.submitButton} id="submit" onclick=${()=>submit(BallotContract)}>Submit</div>
      </div>
    </div>
  </div>
  `
}

function submit (BallotContract) {
  var t = document.getElementById("title")
  var d = document.getElementById("description")
  var a = document.getElementById("address")
  t.style.borderColor = 'black'
  d.style.borderColor = 'black'
  a.style.borderColor = 'black'
  var title = t.value
  var description = d.value
  var address = a.value
  if (!title) {t.style.borderColor = '#b61114'}
  if (!description) {d.style.borderColor = '#b61114'}
  if (!address) {a.style.borderColor = '#b61114'}
  if (title && description && address) {
    // CREATE NEW PROPOSAL
    // @TODO: currently accepted address is only the one copied from Metamask, addresses copied from Remix don't seem to work!
    address = address.toLowerCase().replace('0x', '')
    BallotContract.methods.addProposal(description, title, address).send({ from: address}, function (error, proposalCreated) {
      var submit = document.getElementById("submit")
      submit.style.borderColor = 'green'
      submit.style.color = 'green'
      submit.innerText = 'Success!'
      setTimeout(function () {location.reload()}, 2000)
    })
  }
}

var css = csjs`
  .formMain {
    animation: fadeIn 2s;
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 70%;
  }
  .formTitle {
    font-size: 60px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
    color: #b61114;
  }
  .formSubtitle {
    text-transform: uppercase;
    font-size: 30px;
    padding: 0 0 5px 0;
  }
  .formTip {
    color: #b61114;
    font-size: 16px;
  }
  .formContainer {
    margin-top: 30px 0;
  }
  .formField {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25px 0 10px 0;
  }
  .formFieldInput {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    padding: 3%;
    width: 30%;
    font-size: 14px;
  }
  .formFieldText {
    color: #b61114;
    font-size: 20px;
    min-width: 175px;
    width: 20%;
  }
  .submitContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25px 0 10px 0;
  }
  .submitButton {
    color: #b61114;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #b61114;
    padding: 2.5%;
    width: 31%;
  }
  .submitButton:hover {
    background-color: #e2e1dc;
    cursor: pointer;
  }
  .submitText {
    font-size: 16px;
    min-width: 175px;
    width: 20%;
    margin-right: 0%;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
