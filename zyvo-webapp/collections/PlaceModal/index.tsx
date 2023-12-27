import Button from "@/components/Button";
import { CustomToggleBtn } from "@/components/CustomToggle";
import Input from "@/components/Input";
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
import { timeArray } from "@/lib/utils";
import { Place, amenety } from "@/types/place";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
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
      <div className="px-4 space-y-3">
        <div>Manage your place</div>
        <span>Setup places, availability, prices and more.</span>
        <Tabs
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
      <hr className="my-2" />
      <div className="flex justify-between px-4">
        <Button
          text="Cancel"
          onClick={onClose}
          bordered
          roundedfull
          type="white"
        />
        <Button
          text="Save & Continue"
          roundedfull
          type="green"
          onClick={onSubmit}
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
      <div className="px-4 space-y-3">
        <div>Gallery</div>
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
              <div className="text-sm text-center"> {progress}%</div>
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
      <div className="px-4 space-y-3">
        <div>About the Space</div>
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
      <div className="px-4 space-y-3">
        <div>Parking Rules</div>
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
      <div className="px-4 space-y-3">
        <div>Host Rules</div>
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
      <div className="px-4 space-y-3">
        <div>Address</div>
        <Input
          type="text"
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
          placeholder="City"
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
            placeholder="Country"
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
        <Image
          src={"/images/mapImage.png"}
          alt="favourite-icon"
          width={200}
          height={200}
          className="object-contain w-full h-full rounded-l-xl"
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
      <div className="px-4 space-y-2">
        <label>Type of space</label>
        <Tabs
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
      <div className="px-4 space-y-3">
        <div>Rooms and beds</div>
        <div>Bedrooms</div>
        <Tabs
          options={[
            { name: "0", value: 0 },
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
            { name: "8", value: 8 },
            { name: "8+", value: 9 },
          ]}
          selected={place.bedrooms}
          onSelect={(option) =>
            setPlace((prev) => {
              return { ...prev, bedrooms: +option.value };
            })
          }
        />
        <div>Beds</div>
        <Tabs
          options={[
            { name: "0", value: 0 },
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
            { name: "8", value: 8 },
            { name: "8+", value: 9 },
          ]}
          selected={place.beds}
          onSelect={(option) =>
            setPlace((prev) => {
              return { ...prev, beds: +option.value };
            })
          }
        />
        <div>Bathrooms</div>
        <Tabs
          options={[
            { name: "0", value: 0 },
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
            { name: "8", value: 8 },
            { name: "8+", value: 9 },
          ]}
          selected={place.bathrooms}
          onSelect={(option) =>
            setPlace((prev) => {
              return { ...prev, bathrooms: +option.value };
            })
          }
        />
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3">
        <label>Property type</label>
        <div className="flex gap-3">
          <PropertyType
            imageUrl="/icons/home-filled-icon.svg"
            text="House"
            value="HOUSE"
            selected={place.propertyType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, propertyType: value.toString() };
              })
            }
          />
          <PropertyType
            imageUrl="/icons/building-icon.svg"
            text="Apartment"
            value="APARTMENT"
            selected={place.propertyType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, propertyType: value.toString() };
              })
            }
          />
          <PropertyType
            imageUrl="/icons/guest-house-icon.svg"
            text="Guesthouse"
            value="GUESTHOUSE"
            selected={place.propertyType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, propertyType: value.toString() };
              })
            }
          />
          <PropertyType
            imageUrl="/icons/hotel-icon.svg"
            text="Hotel"
            value="HOTEL"
            selected={place.propertyType}
            onSelect={(value) =>
              setPlace((prev) => {
                return { ...prev, propertyType: value.toString() };
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
              Other property types
            </AccordionTrigger>
            <AccordionContent className="flex gap-3 flex-wrap">
              <PropertyType
                imageUrl="/icons/home-filled-icon.svg"
                text="Barn"
                value="BARN"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/building-icon.svg"
                text="Boat"
                value="BOAT"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/guest-house-icon.svg"
                text="Camper"
                value="CAMPER"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/hotel-icon.svg"
                text="Castle"
                value="CASTLE"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/hotel-icon.svg"
                text="Cave"
                value="CAVE"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/hotel-icon.svg"
                text="Container"
                value="CONTAINER"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/hotel-icon.svg"
                text="Farm"
                value="FARM"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
              <PropertyType
                imageUrl="/icons/hotel-icon.svg"
                text="Tent"
                value="TENT"
                selected={place.propertyType}
                onSelect={(value) =>
                  setPlace((prev) => {
                    return { ...prev, propertyType: value.toString() };
                  })
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accord>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3">
        <div>Amenities</div>
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
      <div className="px-4 space-y-3">
        <div>Booking</div>
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
      <div className="px-4 space-y-3">
        <div>Minimum hour & Pricing</div>
        <div className="flex justify-between gap-4">
          <CustomSelect
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
      <div className="px-4 space-y-3">
        <div>Bulk discount</div>
        <div className="flex justify-between gap-4">
          <CustomSelect
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
      <div className="px-4 space-y-3">
        <div>Add-ons from the host</div>
        <div className="flex flex-wrap gap-2">
          {place.addOns.map((ao, i) => {
            return (
              <div
                key={i}
                className={`border rounded-full py-3 px-5  flex items-center`}
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
                  className="cursor-pointer mx-2"
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

          <div className="border border-neutral-200 rounded-full py-3 px-5 gap-3 w-fit flex items-center">
            <div className="text-black font-normal whitespace-nowrap">
              Add New
            </div>
            <div
              className="w-[24px] h-[24px] rounded-full bg-secondary-green flex items-center justify-center"
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
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3">
        <div>Availability - Days</div>
        <div>Months</div>
        <MultiTabs
          options={[
            { name: "Jan", value: 0 },
            { name: "Feb", value: 1 },
            { name: "Mar", value: 2 },
            { name: "Apr", value: 3 },
            { name: "May", value: 4 },
            { name: "Jun", value: 5 },
            { name: "Jul", value: 6 },
            { name: "Aug", value: 7 },
            { name: "Sep", value: 8 },
            { name: "Oct", value: 9 },
            { name: "Nov", value: 10 },
            { name: "Dec", value: 11 },
          ]}
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
                JSON.stringify([0, 1, 2, 3, 4])
              ? 1
              : JSON.stringify(place.availableDays) === JSON.stringify([5, 6])
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
                    ? [0, 1, 2, 3, 4]
                    : option.value === 2
                    ? [5, 6]
                    : [],
              };
            });
          }}
        />
      </div>
      <hr className="my-8" />
      <div className="px-4 space-y-3">
        <div>Availability - Hours</div>
        <div className="flex gap-3">
          <div className="w-full">
            <label>From</label>
            <CustomSelect
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
const PropertyType = ({
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
      className={`space-y-3 border border-gray-300 px-4 py-3 rounded-lg w-[23%] ${
        selected === value
          ? "bg-gray-100 pointer-events-none"
          : "cursor-pointer"
      }`}
      onClick={() => onSelect && onSelect(value)}
    >
      <div className="h-6">
        <img src={imageUrl} height={20} width={20} />
      </div>
      <div className="text-sm">{text}</div>
    </div>
  );
};
