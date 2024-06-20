import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo.png"
import smartContract from "../constants/contractAddress.json"
import Footer from '../components/Footer'

export default function TermsAndConditions() {
  return (
      <div>
        <div className="padding-y-lg bg-sky-50">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">&nbsp;E-T@SWeeT</span>
          <div className="text-component text-center line-height-lg v-space-md margin-bottom-md">
            <Image src={logo} className="scale-75 rounded-full shadow-lg "></Image>
          </div>
          <header className="container max-width-xs margin-bottom-lg">
              <div className="text-component text-center line-height-lg v-space-md margin-bottom-md">
                  <h1 className='font-extrabold text-2xl text-blue-500'>Terms and Conditions</h1>
              </div>
          </header>
          <div className="container max-width-adaptive-sm">
              <div className="text-component line-height-lg v-space-md">
                  <p>
                      These terms and conditions outline the rules and regulations for the use
                      of E-T@SWeeT E-Voting Website, located at
                      ETASWEET.COM 
                  </p>
                  <p>
                      By accessing this website we assume you accept these terms and
                      conditions. Do not continue to use ETASWEET.COM  if you do not
                      agree to take all of the terms and conditions stated on this page.
                  </p>
                  <p>
                      The following terminology applies to these Terms and Conditions, Privacy
                      Statement and Disclaimer Notice and all Agreements: "Client", "You" and
                      "Your" refers to you, the person log on this website and compliant to
                      the Election's terms and conditions. "The Election's officials", "Ourselves", "We",
                      "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
                      refers to both the Client and ourselves. All terms refer to the offer,
                      acceptance and consideration of payment necessary to undertake the
                      process of our assistance to the Client in the most appropriate manner
                      for the express purpose of meeting the Client’s needs in respect of
                      provision of the Company’s stated services, in accordance with and
                      subject to, prevailing law of Tunisia. Any use of the above
                      terminology or other words in the singular, plural, capitalization
                      and/or he/she or they, are taken as interchangeable and therefore as
                      referring to same.
                  </p>
                  <h3>
                      <strong>User's sessions:</strong>
                  </h3>
                  <p>
                      We employ the use of cookies. By accessing ETASWEET.COM , you
                      agreed to use cookies in agreement with the ETASWEET.COM 's
                      Privacy Policy.
                  </p>
                  <p>
                      Most interactive websites use sessions to let us keep some information like
                      the user’s name, CIN number, state of birth, and his vote Status (vote has been
                      casted or not). Sessions are used by our website to enable the
                      functionality of certain areas to make it easier for citizens using our
                      website.
                  </p>
                  <h3>
                      <strong>License</strong>
                  </h3>
                  <p>
                      Unless otherwise stated, ETASWEET.COM  and/or its licensors
                      own the intellectual property rights for all material on
                      ETASWEET.COM. All intellectual property rights are reserved.
                      You may access this from ETASWEET.COM for your own personal
                      use subjected to restrictions set in these terms and conditions.
                  </p>
                  <p>You must:</p>
                  <ul>
                      <li className='font-medium text-orange-500'>Use Ethereum wallet provider, MetaMask 🦊!</li>
                      <li className='font-medium text-blue-500'>Use Ethereum testnet, Sepolia 🐬!</li>
                      <li>
                          Reproduce, duplicate or copy material from ETASWEET.COM 
                      </li>
                      <li>Redistribute content from ETASWEET.COM </li>
                  </ul>
                  <p>This Agreement shall begin on the date hereof.</p>
                  <p>
                      Parts of this website offer an opportunity for users to register and
                      cast votes to candidates registered to the elections in certain areas of the website.
                      ETASWEET.COM  does not keep users details in any form of database except the smart 
                      contract address: {smartContract.addr} that you can find here on https://sepolia.etherscan.io/ its agents and/or
                      affiliates. Comments reflect the views and opinions of the person who
                      post their views and opinions. To the extent permitted by applicable
                      laws, madewithtailwindcss.com shall not be liable for the Comments or
                      for any liability, damages or expenses caused and/or suffered as a
                      result of any use of and/or posting of and/or appearance of the Comments
                      on this website.
                  </p>
                  <p>You warrant and represent that:</p>
                  <ul>
                      <li>
                          You are entitled to register and cast vote to registered Election's Candidates 
                          on our website and have all necessary licenses and consents to do so, as long you are an eligible citizen
                          that meets the criterias (age, citizenship);
                      </li>
                  </ul>
                  <h3>
                      <strong>iFrames</strong>
                  </h3>
                  <p>
                      Without prior approval and written permission, you may not create frames
                      around our Webpages that alter in any way the visual presentation or
                      appearance of our Website.
                  </p>
                  <h3>
                      <strong>Your Privacy</strong>
                  </h3>
                  <p>Please read Privacy Policy</p>
                  <h3>
                      <strong>Reservation of Rights</strong>
                  </h3>
                  <p>
                      We reserve the right to request that you remove all links or any
                      particular link to our Website. You approve to immediately remove all
                      links to our Website upon request. We also reserve the right to amen
                      these terms and conditions and it’s linking policy at any time. By
                      continuously linking to our Website, you agree to be bound to and follow
                      these linking terms and conditions.
                  </p>
                  <h3>
                      <strong>Disclaimer</strong>
                  </h3>
                  <p>
                      To the maximum extent permitted by applicable law, we exclude all
                      representations, warranties and conditions relating to our website and
                      the use of this website. Nothing in this disclaimer will:
                  </p>
                  <ul>
                      <li>
                          limit or exclude our or your liability for death or personal injury;
                      </li>
                      <li>
                          limit or exclude our or your liability for fraud or fraudulent
                          misrepresentation;
                      </li>
                      <li>
                          limit any of our or your liabilities in any way that is not permitted
                          under applicable law; or
                      </li>
                      <li>
                          exclude any of our or your liabilities that may not be excluded under
                          applicable law.
                      </li>
                  </ul>
                  <p>
                      The limitations and prohibitions of liability set in this Section and
                      elsewhere in this disclaimer: (a) are subject to the preceding
                      paragraph; and (b) govern all liabilities arising under the disclaimer,
                      including liabilities arising in contract, in tort and for breach of
                      statutory duty.
                  </p>
                  <p>
                      As long as the website and the information and services on the website
                      are provided free of charge, we will not be liable for any loss or
                      damage of any nature.
                  </p>
              </div>
          </div>
        </div>
        <Footer></Footer>               
      </div>

  )
}
