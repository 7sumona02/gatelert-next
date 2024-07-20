import Navbar from '@/components/Navbar'
import { CreditCardIcon, DollarSignIcon, GaugeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex items-center h-[80vh]'>
      <main className="flex-1">
        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Secure and Reliable Payments
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  This is a demo application for management and detection of frauds in the fields of finance, accomodating real-time transactions and fraud detection.
                </p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  prefetch={false}
                >
                  Start Demo
                </Link>
              </div>
              <div className="flex justify-center">
                <img src="/finance.svg" width="500" height="400" alt="Hero" className="rounded-lg object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page
