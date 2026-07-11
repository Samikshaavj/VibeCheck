import React from 'react'
import Image from 'next/image'
import { UserRepo } from './workspaceBody'
import { LayoutList, CheckCircle2, XCircle, TrendingUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type props = {
    repoList: UserRepo[]
}

function UserRepoList({ repoList }: props) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-gray-700 uppercase">Repositories</h2>
            <div className="border rounded-xl px-2">
                <Accordion type="single" collapsible defaultValue="item-0">
                    {repoList?.map((repo, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className='flex items-center gap-4'>
                                    <Image src={'/github.png'} alt='github' width={24} height={24} />
                                    <div className='text-left'>
                                        <h2 className='font-semibold text-base text-gray-900'>{repo.full_name}</h2>
                                        <p className='text-xs text-gray-500 font-normal'>
                                            {repo.default_branch} • {repo.language}
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-6 mt-4 mb-4">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Total Tests</p>
                                                <p className="text-2xl font-bold mt-1">0</p>
                                            </div>
                                            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                <LayoutList size={20} />
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Passed</p>
                                                <p className="text-2xl font-bold mt-1">0</p>
                                            </div>
                                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                                <CheckCircle2 size={20} />
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Failed</p>
                                                <p className="text-2xl font-bold mt-1">0</p>
                                            </div>
                                            <div className="bg-red-100 p-2 rounded-full text-red-600">
                                                <XCircle size={20} />
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Pass Rate</p>
                                                <p className="text-2xl font-bold mt-1">0%</p>
                                            </div>
                                            <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                                <TrendingUp size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">Generate AI Test Cases</h3>
                                            <p className="text-xs text-gray-500 mt-1">Analyze this repository and generate automated test cases using AI.</p>
                                        </div>
                                        <Button className="bg-[#618b4e] hover:bg-[#527741] text-white flex items-center gap-2">
                                            <Sparkles size={16} /> Generate Test Cases
                                        </Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default UserRepoList
