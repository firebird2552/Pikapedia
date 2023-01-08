import React, { useEffect } from "react";

export const AdComponent = () => {
  useEffect(() => {
    const installGoogleAds = () => {
      const ad_src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      const elem = document.createElement("script");
      elem.src = ad_src;
      elem.async = true;
      elem.defer = true;
      document.body.insertBefore(elem, document.body.firstChild);
    };
    installGoogleAds();
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="google-ad">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9274144256690588"
        data-ad-slot="2254787771"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {console.error("ins tags:", document.getElementsByTagName("ins"))}
    </div>
  );
};
