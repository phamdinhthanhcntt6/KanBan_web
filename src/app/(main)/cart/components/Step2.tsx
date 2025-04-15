import ProgressCheckOut from "@/app/(main)/cart/components/ProgressCheckOut";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useStepStore from "@/store/useStepStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Step2 = () => {
  const { next } = useStepStore();

  const [method, setMethod] = useState<string>("cod");

  const RadioButton = ({ choose }: { choose: string }) => {
    return (
      <div className="border-black rounded-full w-4 h-4 border-2 flex items-center justify-center">
        {choose === method && (
          <div className="bg-black rounded-full w-2 h-2"></div>
        )}
      </div>
    );
  };

  const FormCardMethod = () => {
    const cardSchema = z.object({
      number: z.string().min(1, "Card number is required"),

      name: z
        .string()
        .min(1, "Card name is required")
        .regex(/^[a-zA-Z\s]+$/, "Must contain only letters and spaces"),

      date: z.string().nonempty(),

      cvv: z
        .string()
        .min(1, "CVV is required")
        .regex(/^[0-9]+$/, "Must contain only digits")
        .max(3, "Must be exactly 3 digits"),
    });

    const form = useForm<z.infer<typeof cardSchema>>({
      resolver: zodResolver(cardSchema),
      defaultValues: {
        number: "",
        name: "",
        date: "",
        cvv: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof cardSchema>) => {
      console.log(values);
    };

    return (
      <div className="px-2 pt-1">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Card number"
                      {...field}
                      maxLength={19}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");

                        const formattedValue = value
                          .replace(/(\d{4})/g, "$1 ")
                          .trim();

                        field.onChange(formattedValue);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card name</FormLabel>
                  <FormControl>
                    <Input placeholder="Card name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-x-4">
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="month"
                        placeholder="Date"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cvv"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="CVV" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-1/3">
              Add card
            </Button>
          </form>
        </Form>
      </div>
    );
  };

  const paymentMethod = [
    {
      value: "card",
      trigger: "Debit/Credit Card",
      children: <FormCardMethod />,
    },
    {
      value: "cod",
      trigger: "Cash on Delivery",
      children: <div className="text-gray-500">Cash on Delivery</div>,
    },
  ];

  return (
    <div className="p-12 gap-y-12 flex flex-col">
      <ProgressCheckOut step={2} />
      <div className="font-semibold">Select a payment method</div>
      <Accordion type="single" collapsible defaultValue="cod">
        {paymentMethod.map((item, index) => (
          <AccordionItem value={item.value} key={index}>
            <AccordionTrigger
              className="justify-normal flex gap-x-4 items-center"
              onClick={() => {
                setMethod(item.value);
                localStorage.setItem("payment", item.value);
              }}
            >
              <RadioButton choose={item.value} />
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent>{item.children}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        className="w-1/2"
        onClick={() =>
          method ? next() : toast.error("Please select a payment method")
        }
      >
        Continue
      </Button>
    </div>
  );
};

export default Step2;
