'use client';
import { getAccounts } from '@/actions/db'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'

function Account(acc: {acc: React.Dispatch<React.SetStateAction<string>>}, label?: string) {
    const [accData, setAccData] = useState<{accountNo: number, currentBal: number}[] | null>()

    useEffect(()=>{
        const fetchData = async () => {
            const data = await getAccounts()
            setAccData(data)
        }
        fetchData()
    }, [])


  return (
    <div className="space-y-2">
            <Label htmlFor="method">{"Select Any Account"}</Label>
            <Select onValueChange={(e) => acc.acc(e)}>
              <SelectTrigger id="method">
                <SelectValue placeholder="..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem disabled value='na'>Select Account</SelectItem>
                {accData && accData.map((acc) => (
                  <SelectItem key={acc.accountNo} value={acc.accountNo.toString()}>
                    {acc.accountNo} - Rs. {acc.currentBal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
  )
}

export default Account
