import Link from "next/link"
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BankingSuccessPage() {
    return (
        <div className="container py-16 px-4 md:px-6 mx-auto">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-lg p-8 shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-600/20 to-green-500/20 border border-green-500/50 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white mb-3 text-center">
                    Bank Details Added Successfully
                </h1>

                <p className="text-zinc-300 mb-8 text-center">
                    Your bank account information has been securely saved. All future payments will be processed to this account.
                </p>

                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-yellow-500 mb-1">Important Information</h3>
                        <p className="text-sm text-yellow-200/80">
                            If you need to change your bank details in the future, please contact our support team. Changes require
                            additional verification and may take 7-10 business days to process.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                    >
                        <Link href={'/admin'}>
                            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    <div className="text-center">
                        <Link href="/contact" className="text-sm text-blue-400 hover:text-blue-300 underline">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
