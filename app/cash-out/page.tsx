import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cashout</CardTitle>
          <CardDescription>Withdraw your earnings to your preferred payment method.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <Label htmlFor="amount">Amount to cashout</Label>
            <Input id="amount" type="number" placeholder="$0.00" />
          </div>
          {/* <div className="grid gap-1">
            <Label htmlFor="method">Payment method</Label>
            <Select>
              <SelectTrigger id="method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button className="w-full">Cashout Now</Button>
        </CardFooter>
        </Card>
    </div>
  )
}