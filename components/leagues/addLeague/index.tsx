import React, { useState } from "react";
import Image from "next/image";
import LeagueForm from "./leagueForm";
import Link from "next/link";
import ArrowUpRightIcon from "@/components/icons/redirect";
import FacebookIcon from "@/components/icons/socials/facebook";
import XIcon from "@/components/icons/socials/xIcon";
import InstagramIcon from "@/components/icons/socials/instagram";
import YoutubeIcon from "@/components/icons/socials/youtube";

export default function AddLeague() {
  const [preview, setPreview] = useState({
    name: "",
    description: "",
    country: { imgPath: "", value: "" },
    logo: null,
    website: "",
    facebook: "",
    xlink: "",
    instagram: "",
    youtube: "",
  });

  const handleLogoImage: any = () => {
    if (!preview.logo) return "";
    return (
      <Image
        src={URL.createObjectURL(preview.logo)}
        alt="league_logo"
        width={150}
        height={150}
        priority
      />
    );
  };
  //
  console.log(preview, "preview");
  return (
    <section className="bg-white shadow-lg grid md:grid-cols-2 gap-4 my-4 py-6 px-6 rounded">
      <LeagueForm setPreview={setPreview} />
      <div className="n_preview border-l py-2 px-4">
        <div className="my-4 flex justify-center">{handleLogoImage()}</div>
        <div>
          <div className="mt-6 text-center px-4 py-4 text-xs p-4">
            <h1 className="text-[1.5rem] text-[#3d185d] font-[800]">
              {preview.name}
            </h1>
          </div>

          <div className="flex justify-center">
            {preview.website !== "" && (
              <Link
                href={preview.website}
                target="_blank"
                className="flex items-center text-blue-600"
              >
                {preview.website.replace(/^https?:\/\//, "")}
                <ArrowUpRightIcon type={"outline"} style="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            {preview.country.imgPath !== "" && (
              <Image
                className="mr-2"
                src={preview.country.imgPath}
                alt="league_logo"
                width={20}
                height={20}
              />
            )}
            {preview.country.value}
          </div>
          <div className="flex px-4 py-4 items-center justify-center text-xs mb-2 p-4">
            <p className="px-6 py-47 text-center text-xs md:text-base">
              {preview.description}
            </p>
          </div>

          <div className="flex items-center justify-center">
            {preview.facebook !== "" && (
              <Link className="mr-2" href={preview.facebook}>
                <FacebookIcon style="w-6 h-6" fill="#1877f2" type={"solid"} />
              </Link>
            )}

            {preview.xlink !== "" && (
              <Link className="mx-2" href={preview.xlink}>
                <XIcon style="w-6 h-6" fill="#14171a" type={"solid"} />
              </Link>
            )}
            {preview.instagram !== "" && (
              <Link className="mx-2" href={preview.instagram}>
                <InstagramIcon style="w-6 h-6" fill="#c87532" type={"solid"} />
              </Link>
            )}

            {preview.youtube !== "" && (
              <Link className="mx-2" href={preview.youtube}>
                <YoutubeIcon style="w-6 h-6" fill="#ff0000" type={"solid"} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
