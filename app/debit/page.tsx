import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <Card className="w-full max-w-md p-6 grid gap-6">
        <CardHeader>
            <CardTitle>Deposit Cash</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="Enter amount" />
            </div>
            <Button>Deposit</Button>
        </CardContent>
        </Card>
    </div>
  )
}