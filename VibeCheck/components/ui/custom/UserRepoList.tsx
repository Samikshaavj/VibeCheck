import React, { useContext, useState } from 'react'
import { UserDetailContext } from '@/db/context/UserDetailContext'
import Image from 'next/image'
import { UserRepo } from './workspaceBody'
import { ListChecks, CheckCircle2, XCircle, TrendingUp, Sparkles, Loader2, Link2Icon, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RepoSettings from './RepoSettings'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import axios from 'axios'
import TestCaseList from './TestCaseList'

type props = {
    repoList: UserRepo[],
    setReload: any,
    token?: string
}

export type TestCase = {
    id: number;
    title: string;
    description: string;
    type: string;
    repoId: number;
    targetFiles: string[];
    expectedResult: string;
    repoName: string;
    repoOwner: string;
    targetRoute: string;
}

type StatusData = {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    passRate: number;
}

const StatusCard = ({ title, value, icon, bgColor }: { title: string, value: any, icon: any, bgColor: string }) => (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
        <div>
            <p className="text-xs text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold mt-1">{value ?? 0}</p>
        </div>
        <div className={`p-2 rounded-full ${bgColor}`}>
            {icon}
        </div>
    </div>
)

function UserRepoList({ repoList, setReload }: props) {
    const { userDetail } = useContext(UserDetailContext);
    const [statusData, setStatusData] = useState<StatusData>();
    const [loading, setLoading] = useState(false);
    const [testCases, setTestCases] = useState<any[]>([]);
    const [testCaseLoading, setTestCaseLoading] = useState(false);


    const handleGenerateTestCases = async (repo: UserRepo) => {
        setLoading(true);
        try {
            // Implement the logic to call the API route to generate test cases for
            const result = await axios.post('/api/generate-test-cases', {
                userId: userDetail?.id,
                repoId: repo?.repoId,
                owner: repo.owner,
                repo: repo.name,
                branch: repo.default_branch,
                githubToken: token
            });

            console.log(result.data);
        } catch (error) {
            console.error("Error generating test cases:", error);
        } finally {
            setLoading(false);
        }
    }

    const GetTestCases = async (repoId: number) => {
        // Implement the logic to fetch test cases for the selected repository
        setTestCaseLoading(true);
        setTestCases([]);
        const result = await axios.get(`/api/test-cases?repoId=${repoId}`);
        setStatusData({
            totalTests: result.data.length,
            passedTests: 0,
            failedTests: 0,
            passRate: 0
        });
        setTestCases(result.data);
        setTestCaseLoading(false);
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-gray-700 uppercase">Repositories</h2>
            <div className="border rounded-xl px-2">
                <Accordion type="single" collapsible onValueChange={(value) => value && GetTestCases(Number(value))}>
                    {repoList?.map((repo, index) => (
                        <AccordionItem value={repo.repoId.toString()} key={index} className="px-4">
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
                                    <div className='pt-4 space-y-5'>
                                        <div className='bg-gray-50 p-3 border rounded-xl flex items-center justify-between'>
                                            <div className='flex gap-3 items-center'>
                                                <Link2Icon className='text-primary' />
                                                <h2>Target Domain:</h2>
                                                <h2 className='bg-white p-1 px-2 border rounded-md text-primary font-medium'>{repo?.targetDomain}</h2>
                                            </div>
                                            <RepoSettings repo={repo} setReload={setReload} />
                                        </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <StatusCard 
                                            title="Total Tests" 
                                            value={statusData?.totalTests} 
                                            icon={<ListChecks className="h-5 w-5 text-blue-600" />} 
                                            bgColor="bg-blue-50" 
                                        />
                                        <StatusCard 
                                            title="Passed" 
                                            value={statusData?.passedTests} 
                                            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />} 
                                            bgColor="bg-green-50" 
                                        />
                                        <StatusCard 
                                            title="Failed" 
                                            value={statusData?.failedTests} 
                                            icon={<XCircle className="h-5 w-5 text-red-600" />} 
                                            bgColor="bg-red-50" 
                                        />
                                        <StatusCard 
                                            title="Pass Rate" 
                                            value={`${statusData?.passRate ?? 0}%`} 
                                            icon={<TrendingUp className="h-5 w-5 text-purple-600" />} 
                                            bgColor="bg-purple-50" 
                                        />
                                    </div>

                                    {!testCaseLoading && testCases?.length > 0 && <TestCaseList testCases={testCases} onReload={() => GetTestCases(Number(repo.repoId))} />}

                                    {testCaseLoading ? 
                                        <h2 className="flex gap-2 items-center"><Loader2 className="animate-spin" /> Please Wait...</h2>
                                    :
                                    testCases?.length == 0 && <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                                        <div>
                                            <h3 className='font-medium'>
                                                {loading ? 'Generating Test Cases...' :
                                                    'Generate AI Test Cases'}</h3>
                                            <p className='text-sm text-gray-500 mt-1'>
                                                Analyze this repository and generate automated test cases using AI.
                                            </p>
                                        </div>

                                        <Button className='gap-2'
                                            disabled={loading}
                                            onClick={() => handleGenerateTestCases(repo)}>
                                            {loading ? <Loader2 className='animate-spin' /> : <Sparkles className='h-4 w-4' />}
                                            Generate Test Cases
                                        </Button>
                                    </div>}
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
