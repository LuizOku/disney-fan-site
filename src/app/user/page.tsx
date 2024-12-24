"use client";

import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { format } from "date-fns";
import Button from "@/components/button";
import Input from "@/components/input";
import { useMask } from "@react-input/mask";

const isValidDate = (value: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(value)) return false;

  const [month, day, year] = value.split("/").map(Number);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthdate: z.string().refine(isValidDate, {
    message: "Invalid date",
  }),
  city: z.string().optional(),
  state: z.string().optional(),
  favoriteCharacter: z.string().optional(),
  favoriteRide: z.string().optional(),
  favoriteMovie: z.string().optional(),
  favoriteDisneyland: z.string().optional(),
});

type UserProfile = z.infer<typeof profileSchema>;

export default function User() {
  const [isEditing, setIsEditing] = useState(false);
  const user = Cookies.get("userProfile")
    ? JSON.parse(Cookies.get("userProfile")!)
    : null;
  const birthDateMaskRef = useMask({
    mask: "__/__/____",
    replacement: { _: /\d/ },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthdate: "",
      city: "",
      state: "",
      favoriteCharacter: "",
      favoriteRide: "",
      favoriteMovie: "",
      favoriteDisneyland: "",
    },
  });

  useEffect(() => {
    const savedProfile = Cookies.get("userProfile");
    if (savedProfile) {
      const profileData: UserProfile = JSON.parse(savedProfile);
      Object.entries(profileData).forEach(([key, value]) => {
        setValue(key as keyof UserProfile, value);
      });
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<UserProfile> = (data) => {
    Cookies.set(
      "userProfile",
      JSON.stringify({ ...data, updatedAt: new Date() }),
      { expires: 7 }
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedProfile = Cookies.get("userProfile");
    if (savedProfile) {
      reset(JSON.parse(savedProfile));
    } else {
      reset();
    }
    setIsEditing(false);
  };

  return (
    <div className="px-10">
      <Header />
      <div className="p-10 bg-gray rounded">
        {!isEditing ? (
          <section className="p-6 w-full">
            <h1 className="text-4xl font-semibold mb-4">
              {user?.firstName ?? "User"} {user?.lastName ?? ""}
            </h1>
            <p className="text-black text-sm mb-6">
              Last Updated:{" "}
              {user?.updatedAt
                ? format(new Date(user?.updatedAt), "LLLL do, yyyy")
                : format(new Date(), "LLLL do, yyyy")}
            </p>
            <p className="text-base font-semibold mt-2">
              Location:{" "}
              {user.city && user.state
                ? `${user.city}, ${user.state}`
                : "Not set"}
            </p>
            <p className="text-base font-semibold mt-2">
              Favorite Character:{" "}
              {user.favoriteCharacter ? user.favoriteCharacter : "Not set"}
            </p>
            <p className="text-base font-semibold mt-2">
              Favorite Ride: {user.favoriteRide ? user.favoriteRide : "Not set"}
            </p>
            <p className="text-base font-semibold mt-2">
              Favorite Movie:{" "}
              {user?.favoriteMovie ? user.favoriteMovie : "Not set"}
            </p>
            <p className="text-base font-semibold mt-2">
              Favorite Disney Theme Park:{" "}
              {user.favoriteDisneyland ? user.favoriteDisneyland : "Not set"}
            </p>
            <div className="mt-8">
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          </section>
        ) : (
          <section className="p-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block font-semibold mb-1">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      {...register("firstName")}
                      className={` ${
                        errors.firstName ? "border-red-500" : "border-slate-300"
                      } w-full`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      {...register("lastName")}
                      className={` ${
                        errors.lastName ? "border-red-500" : "border-slate-300"
                      } w-full`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <Controller
                    name="birthdate"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="block font-semibold mb-1">
                          Birth Date *
                        </label>
                        <Input
                          type="text"
                          {...field}
                          ref={birthDateMaskRef}
                          className={` ${
                            errors.birthdate
                              ? "border-red-500"
                              : "border-slate-300"
                          } w-full`}
                        />
                        {errors.birthdate && (
                          <p className="text-red-500 text-sm">
                            {errors.birthdate.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mb-3">
                  <div>
                    <label className="block font-semibold mb-1">City</label>
                    <Input
                      type="text"
                      {...register("city")}
                      className=" border-slate-300 w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">State</label>
                    <Input
                      type="text"
                      {...register("state")}
                      className=" border-slate-300 w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:w-2/3 mb-3">
                  <label className="block font-semibold mb-1">
                    Favorite Character
                  </label>
                  <Input
                    type="text"
                    {...register("favoriteCharacter")}
                    className=" border-slate-300 w-full"
                  />
                </div>

                <div className="w-full md:w-2/3 mb-3">
                  <label className="block font-semibold mb-1">
                    Favorite Ride
                  </label>
                  <Input
                    type="text"
                    {...register("favoriteRide")}
                    className=" border-slate-300 w-full"
                  />
                </div>

                <div className="w-full md:w-2/3 mb-3">
                  <label className="block font-semibold mb-1">
                    Favorite Movie
                  </label>
                  <Input
                    type="text"
                    {...register("favoriteMovie")}
                    className=" border-slate-300 w-full"
                  />
                </div>

                <div className="w-full md:w-2/3 mb-3">
                  <label className="block font-semibold mb-1">
                    Favorite Disneyland Theme Park
                  </label>
                  <Input
                    type="text"
                    {...register("favoriteDisneyland")}
                    className=" border-slate-300 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="contained" type="submit">
                  Update Profile
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
