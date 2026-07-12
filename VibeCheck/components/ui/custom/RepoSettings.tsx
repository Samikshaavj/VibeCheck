import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from '../button'
import { Settings2 } from 'lucide-react'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { UserRepo } from './workspaceBody'
import { useState } from 'react'
import axios from 'axios'

type props = {
    repo: UserRepo
    setReload: any
}

function RepoSettings({ repo, setReload }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const [repoSettings, setRepoSettings] = useState({
        targetDomain: repo?.targetDomain || '',
        globalInstruction: repo?.globalInstruction || ''
    });

    const handleSaveSettings = async () => {
        const result = await axios.post('/api/user-repo/settings', {
            repoId: repo.repoId,
            targetDomain: repoSettings.targetDomain,
            globalInstruction: repoSettings.globalInstruction,
        });
        
        console.log(result?.data);
        setIsOpen(false);
        setReload();
    }
    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button><Settings2 className='h-4 w-4 mr-1' /> Project Config</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex gap-2 items-center'><Settings2 /> Project/Repo Settings</DialogTitle>
                    <DialogDescription>
                        Configure project-level defaults used during script generation and execution.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div>
                        <label className='text-gray-500 text-sm'>APP URL/DEFAULT WEBSITE</label>
                        <Input 
                            value={repoSettings?.targetDomain}
                            onChange={(e)=>setRepoSettings({...repoSettings, targetDomain: e.target.value})}
                            placeholder='App url/Domain' 
                            className='mt-1' 
                        />
                        <p className='text-xs text-gray-400 mt-1'>The target address where the tests will run.</p>
                    </div>
                    <div className='mt-4'>
                        <label className='text-gray-500 text-sm'>GLOBAL TEST INSTRUCTION</label>
                        <Textarea 
                            value={repoSettings?.globalInstruction}
                            onChange={(e)=>setRepoSettings({...repoSettings, globalInstruction: e.target.value})}
                            placeholder='Instructions' 
                            className='mt-1' 
                        />
                        <p className='text-xs text-gray-400 mt-1'>Include any authentication steps...</p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveSettings}>Save Config</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RepoSettings
