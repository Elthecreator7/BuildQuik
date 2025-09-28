"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import React, { Suspense, useState } from 'react'
import MessagesContainer from '../components/MessagesContainer';
import { Fragment } from '@/generated/prisma';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectHeader } from '../components/ProjectHeader';
import { FragmentWeb } from '../components/FragmentWeb';
import { CodeIcon, CrownIcon, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileExplore } from '@/components/file-explorer';

interface Props {
    projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");

    return (
        <div className='h-screen'>
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className='flex flex-col min-h-0'
                >
                    <Suspense fallback={<p>Loading Project...</p>}>
                        <ProjectHeader projectId={projectId}></ProjectHeader>
                    </Suspense>
                    <Suspense fallback={<p>Loading messages...</p>}>
                        <MessagesContainer
                            projectId={projectId}
                            activeFragment={activeFragment}
                            setActiveFragment={setActiveFragment}
                        ></MessagesContainer>
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle className="hover:bg-primary transition-colors"></ResizableHandle>
                <ResizablePanel
                    defaultSize={65}
                    minSize={50}
                >
                    <Tabs
                        className='h-full gap-y-0'
                        defaultValue='preview'
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}

                    >
                        <div className='w-full flex items-center p-2 border-b gap-x-2'>
                            <TabsList className='h-8 p-0 border rounded-md'>
                                <TabsTrigger value='preview' className='rounded-md'>
                                    <EyeIcon></EyeIcon><span>Demo</span>
                                </TabsTrigger>
                                  <TabsTrigger value='code' className='rounded-md'>
                                    <CodeIcon></CodeIcon><span>Code</span>
                                </TabsTrigger>
                            </TabsList>
                            <div className='ml-auto flex items-center gap-x-2'>
                                <Button asChild size="sm" variant="default">
                                    <Link href='/pricing'>
                                    <CrownIcon></CrownIcon>Upgrade
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value='preview'>
                            {!!activeFragment && <FragmentWeb data={activeFragment}></FragmentWeb>}
                        </TabsContent>
                        <TabsContent value='code' className='min-h-0'>
                            {!!activeFragment?.files && (
                                <FileExplore 
                                files={activeFragment.files as { [path: string]: string }}
                                ></FileExplore>
                            )}
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}