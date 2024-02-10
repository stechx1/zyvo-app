import Button from "@/components/Button";
import { CustomToggleBtn } from "@/components/CustomToggle";
import Input from "@/components/Input";
import { Map } from "@/components/Maps";
import { MultiTabs } from "@/components/MultiTabs";
import CustomSelect from "@/components/SelectDropDown";
import { Tabs } from "@/components/Tabs";
import {
  Accordion as Accord,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  UploadFile,
  deleteFile,
  getFilePathFromURL,
} from "@/firebase/firestore/manageFiles";
import { monthsArray, timeArray } from "@/lib/utils";
import { Place, amenety } from "@/types/place";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
export default function PlaceModal({
  place,
  setPlace,
  onClose,
  onSubmit,
  isLoading,
}: {
  place: Place;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <div
      className={`flex-column w-full my-2 ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      {isLoading && (
        <div className="absolute h-[40rem] w-[100%] backdrop-blur-sm ">
          <div className="flex items-center justify-center h-[100%]">
            <Loader2 className="ml-2 animate-spin" />
          </div>
        </div>
      )}
      <div className="xl:px-4 lg:px-4 md:px-4 sm:px-2 px-3 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg font-normal">Manage your place</div>
        <span>Setup places, availability, prices and more.</span>
        <Tabs
          size="sm"
          options={[
            { name: "Home Setup", value: 1 },
            { name: "Gallery & Location", value: 2 },
            { name: "Availability", value: 3 },
          ]}
          selected={selectedTab}
          onSelect={(option) => setSelectedTab(+option.value)}
        />
      </div>
      <hr className="my-2" />
      <div className="h-[30rem] overflow-auto">
        {selectedTab === 1 ? (
          <HomeSetup place={place} setPlace={setPlace} />
        ) : selectedTab === 2 ? (
          <GallaryAndLocation place={place} setPlace={setPlace} />
        ) : (
          selectedTab === 3 && (
            <Availability place={place} setPlace={setPlace} />
          )
        )}
      </div>
      <hr className="mt-2 mb-3" />
      <div className="flex justify-between px-4 items-center">
        <Button
          size="sm"
          text="Cancel"
          onClick={onClose}
          bordered
          roundedfull
          type="white"
          className="xl:text-[16px] text-[14px]"
        />
        <Button
          size="sm"
          text="Save & Continue"
          roundedfull
          type="green"
          onClick={onSubmit}
          className="xl:text-[16px] text-[14px] text-[#000000]"
        />
      </div>
    </div>
  );
}
const GallaryAndLocation = ({
  place,
  setPlace,
}: {
  place: Place;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}) => {
  const [progress, setprogress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (!newFiles || newFiles.length === 0) {
      return;
    }
    setFile(newFiles[0]);
    UploadFile({
      file: newFiles[0],
      storagePath: "place-images",
      getProgress: (p) => {
        setprogress(p);
      },
      onSuccess: (url) => {
        setPlace((prev) => {
          return {
            ...prev,
            images: [...prev.images, url],
          };
        });
        setFile(null);
      },
    });
  };
  return (
    <div>
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base">
        <div className="text-lg">Gallery</div>
        <div className="flex flex-wrap gap-4">
          {place.images.map((img, i) => {
            return (
              <div key={i} className="relative w-[100px] h-[100px] border p-1">
                <Image
                  src="/icons/close-icon-grey-background.svg"
                  alt="close-icon"
                  width={25}
                  height={25}
                  className="cursor-pointer mx-2 absolute top-[-20px] right-[-25px]"
                  onClick={() => {
                    setPlace((prev) => {
                      return {
                        ...prev,
                        images: prev.images.filter((im) => im !== img),
                      };
                    });
                    deleteFile(getFilePathFromURL(img));
                  }}
                />
                <Image
                  src={img}
                  alt="image"
                  width={100}
                  height={80}
                  objectFit="cover"
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
            );
          })}
          {file ? (
            <div className="w-[100px] h-[100px] border-2 border-dashed justify-center flex flex-col items-center border-gray-200 space-y-1">
              <div className="text-sm text-center"> uploading..</div>
              <div className="text-sm text-center">
                {" "}
                {progress?.toFixed(2)}%
              </div>
            </div>
          ) : (
            <div className="w-[100px] h-[100px] border-2 border-dashed justify-center flex items-center border-gray-200 cursor-pointer">
              <label htmlFor="files">
                <Image
                  src={"/icons/gray-skeleton-img-icon.svg"}
                  alt="image"
                  width={30}
                  height={30}
                />
              </label>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id="files"
            onChange={onSelectFile}
            className="hidden"
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base">
        <div className="text-lg">About the Space</div>
        <div>
          <textarea
            className="px-2 focus:outline-none focus:border-gray-500 focus:border-1 rounded-lg py-1 text-black w-full border"
            rows={4}
            value={place.description}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              })
            }
            placeholder="Description"
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base">
        <div className="text-lg">Parking Rules</div>
        <div>
          <textarea
            className="px-2 focus:outline-none focus:border-gray-500 rounded-lg py-1 text-black w-full border"
            rows={4}
            value={place.parkingRules}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  parkingRules: e.target.value,
                };
              })
            }
            placeholder="(Optional)"
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base">
        <div className="text-lg">Host Rules</div>
        <div>
          <textarea
            className="px-2 focus:outline-none focus:border-gray-500 rounded-lg py-1 text-black w-full border"
            rows={4}
            value={place.hostRules}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  hostRules: e.target.value,
                };
              })
            }
            placeholder="(Optional)"
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base">
        <div className="text-lg">Address</div>
        <Input
          type="text"
          size="sm"
          placeholder="Street"
          value={place.street}
          onChange={(e) =>
            setPlace((prev) => {
              return {
                ...prev,
                street: e.target.value,
              };
            })
          }
        />
        <Input
          type="text"
          size="sm"
          placeholder="City*"
          value={place.city}
          onChange={(e) =>
            setPlace((prev) => {
              return {
                ...prev,
                city: e.target.value,
              };
            })
          }
        />
        <div className="flex gap-3">
          <Input
            size="sm"
            type="text"
            placeholder="Zipcode"
            value={place.zipCode}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  zipCode: e.target.value,
                };
              })
            }
          />
          <Input
            type="text"
            placeholder="Country*"
            size="sm"
            value={place.country}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  country: e.target.value,
                };
              })
            }
          />
          <Input
            type="text"
            placeholder="State"
            size="sm"
            value={place.state}
            onChange={(e) =>
              setPlace((prev) => {
                return {
                  ...prev,
                  state: e.target.value,
                };
              })
            }
          />
        </div>
        <Map
          getCoordinates={(coords) => {
            setPlace((prev) => {
              return {
                ...prev,
                coordinates: coords,
              };
            });
          }}
          coords={place.coordinates}
        />
      </div>
    </div>
  );
};
const HomeSetup = ({
  place,
  setPlace,
}: {
  place: Place;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}) => {
  const [showOtherPropertyTypes, setShowOtherPropertyTypes] = useState(false);

  useEffect(() => {
    if (place.activityType !== "STAYS" && place.bedrooms)
      setPlace((prev) => {
        return { ...prev, bedrooms: undefined };
      });
  }, [place.activityType]);

  const handleChangeAmeneties = (checked: boolean, value: amenety) => {
    {
      if (checked) {
        setPlace((prev) => {
          return {
            ...prev,
            ameneties: [...prev.ameneties, value],
          };
        });
      } else {
        setPlace((prev) => {
          return {
            ...prev,
            ameneties: prev.ameneties.filter((a) => a !== value),
          };
        });
      }
    }
  };
  return (
    <div>
      <div className="xl:px-4 lg:px-4 md:px-3 px-3 space-y-2 mt-4 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <label className="text-lg">Type of space</label>
        <Tabs
          size="sm"
          options={[
            { name: "Entire Home", value: "HOME" },
            { name: "Private Room", value: "ROOM" },
          ]}
          selected={place.spaceType}
          onSelect={(option) =>
            setPlace((prev) => {
              return { ...prev, spaceType: option.value.toString() };
            })
          }
        />
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Availability</div>
        <div>Property size (sq ft)</div>
        <CustomSelectionType
          options={[
            { name: "Any" },
            { name: "40", value: 40 },
            { name: "50", value: 50 },
            { name: "60", value: 60 },
            { name: "80", value: 80 },
            { name: "90", value: 90 },
          ]}
          selected={place.size}
          onSelect={(value) => {
            setPlace((prev) => {
              return {
                ...prev,
                size: typeof value === "number" ? value : undefined,
              };
            });
          }}
        />
        <div>No of People</div>
        <CustomSelectionType
          options={[
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
          ]}
          selected={place.peopleCount}
          onSelect={(value) => {
            setPlace((prev) => {
              return {
                ...prev,
                peopleCount: typeof value === "number" ? value : 0,
              };
            });
          }}
        />
        <div>Bathrooms</div>
        <CustomSelectionType
          options={[
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
          ]}
          selected={place.bathrooms}
          onSelect={(value) => {
            setPlace((prev) => {
              return {
                ...prev,
                bathrooms: typeof value === "number" ? value : 0,
              };
            });
          }}
        />
        <div>Bedrooms</div>
        <CustomSelectionType
          options={[
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
          ]}
          selected={place.bedrooms}
          onSelect={(value) => {
            setPlace((prev) => {
              return {
                ...prev,
                bedrooms: typeof value === "number" ? value : 0,
              };
            });
          }}
          disabled={place.activityType !== "STAYS"}
        />
      </div>
      <hr className="my-8" />
      <div className="xl:px-4 lg:px-4 md:px-4 sm:px-4 px-3 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <label className="text-lg">Activities</label>
        <div className="flex gap-3 flex-wrap">
          <ActivityType
            imageUrl="/icons/stays-icon.svg"
            text="Stays"
            value="STAYS"
            selected={place.activityType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, activityType: value.toString() };
              })
            }
          />
          <ActivityType
            imageUrl="/icons/event-space-icon.svg"
            text="Event Space"
            value="EVENTSPACE"
            selected={place.activityType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, activityType: value.toString() };
              })
            }
          />
          <ActivityType
            imageUrl="/icons/photoshoot-icon.svg"
            text="Photo shoot"
            value="PHOTOSHOOT"
            selected={place.activityType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, activityType: value.toString() };
              })
            }
          />
          <ActivityType
            imageUrl="/icons/meeting-icon.svg"
            text="Meeting"
            value="MEETING"
            selected={place.activityType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, activityType: value.toString() };
              })
            }
          />
        </div>
        <Accord
          type="single"
          value={showOtherPropertyTypes ? "item-1" : ""}
          collapsible
        >
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger
              className="font-normal text-sm"
              onClick={() => setShowOtherPropertyTypes((prev) => !prev)}
            >
              Other Activites
            </AccordionTrigger>
            <AccordionContent className="flex gap-3 flex-wrap">
              <ActivityType
                imageUrl="/icons/party-icon.svg"
                text="Party"
                value="PARTY"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/filmshoot-icon.svg"
                text="Film Shoot"
                value="FILMSHOOT"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/performance-icon.svg"
                text="Performance"
                value="PERFORMANCE"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/workshop-icon.svg"
                text="Workshop"
                value="WORKSHOP"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/corporate-event-icon.svg"
                text="Corporate Event"
                value="CORPORATEEVENT"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/wedding-icon.svg"
                text="Wedding"
                value="WEDDING"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/dinner-icon.svg"
                text="Dinner"
                value="DINNER"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/retreat-icon.svg"
                text="Retreat"
                value="RETREAT"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/popup-icon.svg"
                text="Pop-up"
                value="POPUP"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/networking-icon.svg"
                text="Networking"
                value="NETWORKING"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/fitness-class-icon.svg"
                text="Fitness Class"
                value="FITNESSCLASS"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
              <ActivityType
                imageUrl="/icons/audio-recording-icon.svg"
                text="Audio Recording"
                value="AUDIORECORDING"
                selected={place.activityType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, activityType: value.toString() };
                  })
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accord>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Amenities</div>
        <div className="flex gap-2 flex-wrap">
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "WIFI")}
              onChange={(e) => handleChangeAmeneties(e.target.checked, "WIFI")}
            />
            <label>Wifi</label>
          </div>
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "KITCHEN")}
              onChange={(e) =>
                handleChangeAmeneties(e.target.checked, "KITCHEN")
              }
            />
            <label>Kitchen</label>
          </div>
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "WASHER")}
              onChange={(e) =>
                handleChangeAmeneties(e.target.checked, "WASHER")
              }
            />
            <label>Washer</label>
          </div>
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "DRYER")}
              onChange={(e) => handleChangeAmeneties(e.target.checked, "DRYER")}
            />
            <label>Dryer</label>
          </div>
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "AIR CONDITIONING")}
              onChange={(e) =>
                handleChangeAmeneties(e.target.checked, "AIR CONDITIONING")
              }
            />
            <label>Air Conditioning</label>
          </div>
          <div className="w-[47%] space-x-1.5">
            <input
              type="checkbox"
              checked={!!place.ameneties.find((a) => a === "HEATING")}
              onChange={(e) =>
                handleChangeAmeneties(e.target.checked, "HEATING")
              }
            />
            <label>Heating</label>
          </div>
        </div>
        {/* <div>
          <u>Show more</u>
        </div> */}
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Booking</div>
        <div className="flex justify-between items-center">
          <div>
            <div>Instant Book</div>
            <div>Users can book without waiting for host approval</div>
          </div>
          <CustomToggleBtn
            isToggled={place.instantBook}
            handleToggle={() => {
              setPlace((prev) => {
                return {
                  ...prev,
                  instantBook: !prev.instantBook,
                };
              });
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div>Self check-in</div>
            <div>Easy access to the property once you arrive</div>
          </div>
          <CustomToggleBtn
            isToggled={place.selfCheckIn}
            handleToggle={() => {
              setPlace((prev) => {
                return {
                  ...prev,
                  selfCheckIn: !prev.selfCheckIn,
                };
              });
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div>Allows pets</div>
            <div>
              <u>Allow bring animals?</u>
            </div>
          </div>
          <CustomToggleBtn
            isToggled={place.allowPets}
            handleToggle={() => {
              setPlace((prev) => {
                return {
                  ...prev,
                  allowPets: !prev.allowPets,
                };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
const Availability = ({
  place,
  setPlace,
}: {
  place: Place;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}) => {
  return (
    <div>
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Minimum hour & Pricing</div>
        <div className="flex justify-between gap-4">
          <CustomSelect
            size="sm"
            options={[
              { label: "1 hour minimum", value: "1" },
              { label: "2 hour minimum", value: "2" },
              { label: "3 hour minimum", value: "3" },
              { label: "4 hour minimum", value: "4" },
              { label: "5 hour minimum", value: "5" },
            ]}
            value={place.minHours.toString()}
            onValueChange={(value) => {
              setPlace((prev) => {
                return {
                  ...prev,
                  minHours: +value,
                };
              });
            }}
            roundedFull
          />
          <CustomSelect
            size="sm"
            options={[
              { label: "10 $ / hour", value: "10" },
              { label: "20 $ / hour", value: "20" },
              { label: "30 $ / hour", value: "30" },
              { label: "40 $ / hour", value: "40" },
              { label: "50 $ / hour", value: "50" },
            ]}
            value={place.pricePerHour.toString()}
            onValueChange={(value) => {
              setPlace((prev) => {
                return {
                  ...prev,
                  pricePerHour: +value,
                };
              });
            }}
            roundedFull
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Bulk discount</div>
        <div className="flex justify-between gap-4">
          <CustomSelect
            size="sm"
            options={[
              { label: "4 hours", value: "4" },
              { label: "5 hours", value: "5" },
              { label: "6 hours", value: "6" },
              { label: "7 hours", value: "7" },
            ]}
            value={place.discountedMinHours.toString()}
            onValueChange={(value) => {
              setPlace((prev) => {
                return {
                  ...prev,
                  discountedMinHours: +value,
                };
              });
            }}
            roundedFull
          />
          <CustomSelect
            size="sm"
            options={[
              { label: "5% Discount", value: "5" },
              { label: "10% Discount", value: "10" },
              { label: "15% Discount", value: "15" },
              { label: "20% Discount", value: "20" },
              { label: "25% Discount", value: "25" },
              { label: "30% Discount", value: "30" },
              { label: "35% Discount", value: "35" },
              { label: "40% Discount", value: "40" },
              { label: "45% Discount", value: "45" },
              { label: "50% Discount", value: "50" },
            ]}
            value={place.discountPercentage.toString()}
            onValueChange={(value) => {
              setPlace((prev) => {
                return {
                  ...prev,
                  discountPercentage: +value,
                };
              });
            }}
            roundedFull
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Add-ons from the host</div>
        <div className="flex flex-wrap gap-2">
          {place.addOns.map((ao, i) => {
            return (
              <div
                key={i}
                className={`border rounded-full py-1 xl:py-3 lg:py-3 md:py-3 sm:py-3 xl:px-5 lg:px-5 md:px-5 sm:px-5 px-3 flex items-center`}
              >
                <input
                  style={{ width: ao.name.length * 8 + 15 + "px" }}
                  className={`text-black font-normal focus:outline-none `}
                  value={ao.name}
                  onChange={(e) => {
                    setPlace((prev) => {
                      return {
                        ...prev,
                        addOns: prev.addOns.map((aons, j) => {
                          if (i === j) {
                            return {
                              ...aons,
                              name: e.target.value,
                            };
                          }
                          return aons;
                        }),
                      };
                    });
                  }}
                />
                <input
                  style={{ width: ao.price.toString().length * 10 + "px" }}
                  className={`text-black font-normal focus:outline-none `}
                  value={ao.price}
                  onChange={(e) => {
                    try {
                      setPlace((prev) => {
                        return {
                          ...prev,
                          addOns: prev.addOns.map((aons, j) => {
                            if (i === j) {
                              return {
                                ...aons,
                                price:
                                  parseInt(e.target.value) >= 0
                                    ? parseInt(e.target.value)
                                    : 0,
                              };
                            }
                            return aons;
                          }),
                        };
                      });
                    } catch (error) {}
                  }}
                />
                $
                <Image
                  src="/icons/close-icon-grey-background.svg"
                  alt="close-icon"
                  width={25}
                  height={25}
                  className="cursor-pointer mx-2 h-[72%] xl:h-max lg:h-max md:h-max sm:h-max"
                  onClick={() => {
                    setPlace((prev) => {
                      return {
                        ...prev,
                        addOns: prev.addOns.filter((paons, k) => k !== i),
                      };
                    });
                  }}
                />
              </div>
            );
          })}

          <div className="border text-sm xl:text-base lg:text-base md:text-base border-neutral-200 rounded-full py-1 xl:py-3 lg:py-3 md:py-3 sm:py-3 xl:px-5 lg:px-5 md:px-5 sm:px-5 px-3 gap-3 w-fit flex items-center">
            <div className="text-black font-normal whitespace-nowrap">
              Add New
            </div>
            <div
              className="xl:w-[24px] lg:w-[24px] md:w-[24px] sm:w-[24px] w-[20px] xl:h-[24px] lg:h-[24px] md:h-[24px] sm:h-[22px] h-[20px] rounded-full bg-secondary-green flex items-center justify-center"
              role="button"
              onClick={() => {
                setPlace((prev) => {
                  return {
                    ...prev,
                    addOns: [...prev.addOns, { name: "name", price: 0 }],
                  };
                });
              }}
            >
              <Image
                src="/icons/plus-icon.svg"
                alt="plus-icon"
                width={13}
                height={13}
                className="cursor-pointer h-[45%] xl:h-max lg:h-max md:h-max sm:h-max"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Availability - Days</div>
        <div>Months</div>
        <MultiTabs
          options={monthsArray}
          selected={place.availableMonths}
          onSelect={(values) => {
            setPlace((prev) => {
              return {
                ...prev,
                availableMonths: values.map((v) => +v),
              };
            });
          }}
        />
        <div>Days</div>
        <Tabs
          size="sm"
          options={[
            { name: "All", value: 0 },
            { name: "Only Working Days", value: 1 },
            { name: "Only Weekends", value: 2 },
          ]}
          selected={
            JSON.stringify(place.availableDays) ===
            JSON.stringify([0, 1, 2, 3, 4, 5, 6])
              ? 0
              : JSON.stringify(place.availableDays) ===
                JSON.stringify([1, 2, 3, 4, 5])
              ? 1
              : JSON.stringify(place.availableDays) === JSON.stringify([6, 0])
              ? 2
              : 3
          }
          onSelect={(option) => {
            setPlace((prev) => {
              return {
                ...prev,
                availableDays:
                  option.value === 0
                    ? [0, 1, 2, 3, 4, 5, 6]
                    : option.value === 1
                    ? [1, 2, 3, 4, 5]
                    : option.value === 2
                    ? [6, 0]
                    : [],
              };
            });
          }}
        />
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3 text-sm xl:text-base lg:text-base md:text-base sm:text-base">
        <div className="text-lg">Availability - Hours</div>
        <div className="flex gap-3">
          <div className="w-full">
            <label>From</label>
            <CustomSelect
              size="sm"
              options={timeArray}
              value={place.availableHoursFrom}
              onValueChange={(value) => {
                setPlace((prev) => {
                  return { ...prev, availableHoursFrom: value };
                });
              }}
              roundedFull
            />
          </div>
          <div className="w-full">
            <label>To</label>
            <CustomSelect
              size="sm"
              options={timeArray}
              value={place.availableHoursTo}
              onValueChange={(value) => {
                setPlace((prev) => {
                  return { ...prev, availableHoursTo: value };
                });
              }}
              roundedFull
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const ActivityType = ({
  imageUrl,
  text,
  value,
  selected,
  onSelect,
}: {
  imageUrl: string;
  text: string;
  value: string | number;
  selected?: string | number;
  onSelect?: (value: string | number) => void;
}) => {
  return (
    <div
      className={`space-y-3 border border-gray-300 xl:px-4 lg:px-4 md:px-4 sm:px-3 px-2 xl:py-3 lg:py-3 md:py-3 py-2 rounded-lg xl:w-[23%] lg:w-[23%] md:w-[23%] sm:w-[23%] w-max ${
        selected === value
          ? "bg-gray-100 pointer-events-none"
          : "cursor-pointer"
      }`}
      style={{ minWidth: "4.65rem" }}
      onClick={() => onSelect && onSelect(value)}
    >
      <div className="h-6">
        <Image src={imageUrl} alt="icon" height={25} width={25} />
      </div>
      <div className="sm:text-sm md:text-sm lg:text-sm xl:text-sm text-xs text-black">
        {text}
      </div>
    </div>
  );
};
const CustomSelectionType = ({
  options,
  selected,
  onSelect,
  disabled = false,
}: {
  options: { name: string; value?: number | string }[];
  selected?: string | number;
  onSelect?: (value?: string | number) => void;
  disabled?: boolean;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [typedValue, setTypedValue] = useState<string | number>("");

  useEffect(() => {
    if (typeof selected === "undefined") return;
    if (!options.find((o) => o.value == selected)) setTypedValue(selected);
    else setTypedValue("");
    ref.current?.blur();
  }, [selected]);

  return (
    <div
      className={`flex justify-between text-center ${
        disabled ? "bg-gray-100" : "bg-gray-200"
      } xl:px-2 lg:px-2 md:px-2 sm:px-2 px-1 xl:py-2 lg:py-2 md:py-2 sm:py-2 py-1 rounded-full`}
    >
      {options.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              !disabled && onSelect && onSelect(item.value);
            }}
            className={`w-[45%] py-2 xl:py-1 lg:py-1 md:py-1 sm:py-1 rounded-full text-sm md:text-base sm:text-base lg:text-[13.5px] xl:text-[13.5px] ${
              disabled ? "text-gray-400" : ""
            } ${
              item.value === selected
                ? "bg-white pointer-events-none"
                : !disabled && "cursor-pointer"
            }`}
          >
            {item.name}
          </div>
        );
      })}
      {
        <input
          ref={ref}
          tabIndex={-1}
          disabled={disabled}
          style={{
            width:
              (typedValue
                ? (typedValue?.toString()?.length ?? 0) * 10 + 25
                : 60) + "px",
          }}
          className={`rounded-full outline-none px-3 border  ${
            disabled
              ? "bg-gray-100 border-gray-300"
              : "bg-gray-200 border-gray-400"
          } focus:bg-white mx-2`}
          value={typedValue}
          onKeyUp={(e) => {
            if ((e.key === "Enter" || e.keyCode === 13) && ref.current) {
              ref.current?.blur();
            }
          }}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              setTypedValue(e.target.value);
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length <= 3 && onSelect && typedValue) {
              onSelect(+typedValue);
            }
          }}
          placeholder="Type"
        />
      }
    </div>
  );
};
