import React from "react";
import styles from "./socialshareModal.module.css";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SocialShareModal = ({ setShareModal, id }) => {
  // console.log(id, "id here");

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h3 className="px-3">Social Share</h3>
          <button
            className={styles.close_modal_button}
            onClick={() => setShareModal(false)}
          >
            X
          </button>
        </div>
        <div className="text-center pt-4 pb-5">
          {/* eslint-disable-next-line */}
          <FacebookShareButton
            url={`https://atlanticpowerandequipment.vercel.app/single-product/${id}`}
            quote="Link"
            hashtag="#React"
            className="px-3 py-2"
          >
            <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
          </FacebookShareButton>
          <WhatsappShareButton
            url={`https://atlanticpowerandequipment.vercel.app/single-product/${id}`}
            quote="Link"
            hashtag="#React"
            className="px-3 py-2"
          >
            <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
          </WhatsappShareButton>
          <TwitterShareButton
            url={`https://atlanticpowerandequipment.vercel.app/single-product/${id}`}
            quote="Link"
            hashtag="#React"
            className="px-3 py-2"
          >
            <TwitterIcon logoFillColor="white" round={true}></TwitterIcon>
          </TwitterShareButton>
        </div>
        <div className="d-flex justify-content-evenly">
          <button className="w-25" onClick={() => setShareModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
