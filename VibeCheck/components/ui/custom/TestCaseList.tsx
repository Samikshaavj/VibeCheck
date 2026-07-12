import React, { useState } from 'react'
import { TestCase } from './UserRepoList'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SettingsIcon, Play, RefreshCw } from 'lucide-react'
import TestCaseSettingDialog from './TestCaseSettingDialog'

type Props = {
    testCases: TestCase[]
    onReload: () => void
}

function TestCaseList({ testCases, onReload }: Props) {
  const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([]);

  const handleSelectedTestCase = (checked: boolean, testCase: TestCase) => {
      if (checked) {
          setSelectedTestCases((prev) => [...prev, testCase]);
      } else {
          setSelectedTestCases((prev) => prev.filter((item) => item.id !== testCase.id));
      }
  }

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
            <h2 className='font-medium text-primary'>Generated Test Cases</h2>
            <Button size={'sm'} onClick={onReload}>
                <RefreshCw className='h-3 w-3 mr-1' /> Refresh
            </Button>
        </div>
        <div className='border rounded-md mt-3'>
            {testCases.map((testCase, index) => (
                <div key={index} className='p-4 border-b flex items-center justify-between last:border-b-0'>
                    <div className='flex gap-3 items-center'>
                        <Checkbox 
                            checked={selectedTestCases?.some((item: any) => item.id == testCase.id)}
                            onCheckedChange={(checked: boolean) => handleSelectedTestCase(checked, testCase)} 
                        />
                        <div>
                            <h2 className='font-semibold'>{testCase?.title}</h2>
                            <p className='text-xs text-gray-500 mt-1'>{testCase?.description}</p>
                        </div>
                    </div>
                    <div className='gap-4 flex'>
                        <Badge variant={'secondary'}>{testCase?.type}</Badge>
                        <Badge variant={'secondary'}>Pending</Badge>
                        <TestCaseSettingDialog testCase={testCase} setReload={onReload} />
                    </div>
                </div>
            ))}
            
            <div className='flex items-center justify-between p-4 border-t bg-gray-50 rounded-b-md'>
                <span className='font-medium text-sm'>Run Selected Test Case</span>
                <Button disabled={selectedTestCases?.length === 0} className='bg-green-600 hover:bg-green-700 text-white gap-2'>
                    <Play className='h-4 w-4' /> Run Selected
                </Button>
            </div>
        </div>
    </div>
  )
}

export default TestCaseList
