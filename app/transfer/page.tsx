'use client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Account from "../account";
import { useState } from "react";
import { toast } from 'sonner';
import { getAccount, getStatus, pushTransactions } from "@/actions/db"
import { Loader } from "lucide-react"

export default function Component() {
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [loading, setLoading] = useState(false);

  async function makeTransaction() {
    if (toAccount === '' || fromAccount === '') {
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
    const fromAccData = await getAccount(parseInt(fromAccount))
    if (!fromAccData) {
      toast.error('Account not found')
      return
    }
    if (fromAccData.currentBal < parseFloat(amount)) {
      toast.error('Insufficient balance')
      setAmount('')
      return
    }
    toast.message('Processing payment...')

    const res = await pushTransactions({
      type: 'TRANSFER',
      amount: parseInt(amount),
      accountNo: parseInt(fromAccount),
      prevBal: fromAccData.currentBal,
      newBal: fromAccData.currentBal - parseFloat(amount)
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
          <CardTitle>Bank Transfer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Account acc={setFromAccount}/>
          <Account acc={setToAccount} />
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="Enter amount" />
          </div>
        </CardContent>
        <CardFooter>
        <Button onClick={()=>makeTransaction()} className="w-full">{loading ? <Loader/> : "Confirm Payment"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}