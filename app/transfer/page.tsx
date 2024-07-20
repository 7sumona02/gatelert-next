import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cash Payment Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient's Name</Label>
            <Input id="recipient" placeholder="Enter recipient's name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="Enter amount" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Confirm Payment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}