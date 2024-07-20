'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { getAccount, getStatus, pushTransactions } from "@/actions/db"
import { useState } from "react"
import { Loader } from "lucide-react"
import Account from "../account"

export default function Component() {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);

  async function makeTransaction() {
    if (account === '') {
      toast.error('Select an account')
      return
    }
    if (amount === '') {
      toast.error('Enter an amount')
      return
    }
    if (isNaN(parseInt(amount))) {
      toast.error('Enter a valid amount')
      return
    }
    setLoading(true)
    const accData = await getAccount(parseInt(account))
    if (!accData) {
      toast.error('Account not found')
      return
    }
    if (accData.currentBal < parseFloat(amount)) {
      toast.error('Insufficient balance')
      setAmount('')
      return
    }

    const res = await pushTransactions({
      type: 'CASH_OUT',
      amount: parseInt(amount),
      accountNo: parseInt(account),
      prevBal: accData.currentBal,
      newBal: accData.currentBal - parseFloat(amount)
    })
    let i = 20;
    if (res){
      const inter = setInterval(async () => {
        console.log(i)
        const status = await getStatus(res);
        if (status?.status === 'Approved') {
          toast.success('Payment successful')
          setAmount('')
          clearInterval(inter);
          setLoading(false)
        }
        else if (status?.status === 'Disapproved') {
          toast.error('Payment Failed')
          setAmount('')
          clearInterval(inter);
          setLoading(false)
        }
        else if (i === 0) {
          toast.error('Payment is taking too long...')
          setAmount('')
          clearInterval(inter);
          setLoading(false)
        }
        i--;
    },3000)
  }
}
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cashout</CardTitle>
          <CardDescription>Withdraw your earnings to your preferred payment method.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <Account  acc={setAccount}/>
          <div className="grid gap-1">
            <Label htmlFor="amount">Amount to cashout</Label>
            <Input id="amount" onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="Rs 0.00" />
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
        <Button onClick={()=>makeTransaction()} className="w-full">{loading ? <Loader/> : "Cashout Now"}</Button>
        </CardFooter>
        </Card>
    </div>
  )
}