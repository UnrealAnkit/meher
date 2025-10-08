import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactSection = (): JSX.Element => {
  return (
    <section className="w-full relative">
      <Card className="bg-[#ab4b28] border-none rounded-[15px] overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-[501px_1fr] min-h-[668px]">
            <div className="relative h-[668px]">
              <img
                className="w-full h-full rounded-l-[15px] object-cover"
                alt="Contact"
                src="/img-8041-1.png"
              />
            </div>

            <div className="flex flex-col px-12 py-[72px]">
              <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[40px] tracking-[0] leading-[40px] mb-[78px]">
                REQUEST A EXPLORATION CALL
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="[font-family:'Poppins',Helvetica] font-semibold text-[#f8f8f9] text-xl tracking-[0] leading-5"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="h-14 bg-[#fcf3ff96] border-none rounded-[15px] text-[#f8f8f9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="[font-family:'Poppins',Helvetica] font-semibold text-[#f8f8f9] text-xl tracking-[0] leading-5"
                  >
                    E-Mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-14 bg-[#dbaea7] border-none rounded-[15px] text-[#f8f8f9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="mobile"
                    className="[font-family:'Poppins',Helvetica] font-semibold text-[#f8f8f9] text-xl tracking-[0] leading-5"
                  >
                    Mobile Numbers
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    className="h-14 bg-[#dbaea7] border-none rounded-[15px] text-[#f8f8f9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="interested"
                    className="[font-family:'Poppins',Helvetica] font-semibold text-[#f8f8f9] text-xl tracking-[0] leading-5"
                  >
                    Interested in
                  </Label>
                  <Input
                    id="interested"
                    className="h-14 bg-[#dbaea7] border-none rounded-[15px] text-[#f8f8f9]"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label
                  htmlFor="message"
                  className="[font-family:'Poppins',Helvetica] font-semibold text-[#f8f8f9] text-xl tracking-[0] leading-5"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  className="min-h-[189px] bg-[#dbaea7] border-none rounded-[15px] text-[#f8f8f9] resize-none"
                />
              </div>

              <div className="flex justify-center">
                <Button className="h-14 w-[633px] bg-white hover:bg-white/90 rounded-[15px] [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-xl tracking-[0] leading-5">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
