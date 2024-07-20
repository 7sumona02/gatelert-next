"use server";

import { PrismaClient, transactions } from "@prisma/client";
import exp from "constants";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function getAccounts() {
  return await prisma.account.findMany();
}

export async function getTransactions() {
    return await prisma.transactions.findMany({
        take: 10,
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getAccount(id: number) {
  return await prisma.account.findUnique({
    where: { accountNo: id },
  });
}

export async function addTo(id: number, amount: number) {
  await prisma.account.update({
    where: { accountNo: id },
    data: { currentBal: { increment: amount } },
  });
}

export async function deductFrom(id: number, amount: number) {
  return await prisma.account.update({
    where: { accountNo: id },
    data: { currentBal: { decrement: amount } },
  });
}

export async function fromAtoB(idA: number, idB: number, amount: number) {
  await deductFrom(idA, amount);
  return await addTo(idB, amount);
}



export async function pushTransactions(data: {
  type: string;
  amount: number;
  accountNo: number;
  prevBal: number;
  newBal: number;
}){
  const res = await prisma.transactions.create({
    data: {
      transactionId: randomUUID().toString(),
      transactionType: data.type,
      oldBalance: data.prevBal,
      amount: data.amount,
      newBalance: data.newBal,
      accountNo: data.accountNo,
      status: "processing",
      flag: "pending",
      alertType: "info",
      details: "Transaction is processing",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return res.transactionId;
//   let i = 4; 
//   const interval = 3000; 
  
//   return new Promise(() => {

//     const inter = setInterval(async () => {
//         console.log(i)
//       if (i === 0) {
//         clearInterval(inter);
//         return resolve(res)
//       }

//       const update = await prisma.transactions.findUnique({
//         where: { transactionId: res.transactionId },
//       });

//       if (update?.status === "Approved" || update?.status === "Disapproved") {
//         clearInterval(inter);
//           return resolve(res);
//       }

//       i--;
//     }, interval);
// });
}


export async function getStatus(id: string) {
    return await prisma.transactions.findUnique({
        where: { transactionId: id },
    });
}


async function resolve(res: transactions){
    console.log("new Code")
  const current = await prisma.transactions.findUnique({
    where: { transactionId: res.transactionId },
  });

  console.log(current)

  if (current?.status === "Approved") {
    switch (current.transactionType) {
        case "CASH_IN":
            await addTo(current.accountNo, current.amount);
            break;
        case "CASH_OUT":
            await deductFrom(current.accountNo, current.amount);
            break;
        case "TRANSFER":
            await fromAtoB(current.accountNo, current.accountNo, current.amount);
            break;
        case "DEBIT":
            await deductFrom(current.accountNo, current.amount);
            break;
        case "PAYMENT":
            await deductFrom(current.accountNo, current.amount);
            break;
        default:
            break;
  }
  return "Approved";

}else if(current?.status === "Disapproved") {
    return "Disapproved";
}else{
    return "Pending";
}

}
