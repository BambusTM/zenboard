'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {Navbar} from "@/components/Navbar";
import {ZBUseUser} from "@/components/provider/UserProvider";
import {Switch} from "@/components/ui/switch";
import {api} from "@/trpc/react";

const CreateBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  createSession: z.boolean(),
});

export default function CreateBoardPage() {
  const user = ZBUseUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      name: '',
      createSession: false,
    },
  });

  const createBoardMutation = api.board.create.useMutation({
    onSuccess: (data) => {
      if (data.session) {
        router.push(`/board/${data.id}?joinCode=${data.session.joinCode}`);
      } else {
        router.push(`/board/${data.id}`);
      }
    },
  });

  function onSubmit(values: z.infer<typeof CreateBoardSchema>) {
    createBoardMutation.mutate(values);
  }

  return (
      <main className="flex min-h-screen flex-col items-center">
        <Navbar email={user?.email}/>
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create a new board</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form to get started.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Board Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My awesome board" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="createSession"
                  render={({field}) => (
                      <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Create a session</FormLabel>
                          <FormDescription>
                            Allow others to join your board with a unique code.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                  )}
              />
              <Button
                  type="submit"
                  className="w-full"
                  disabled={createBoardMutation.isPending}
              >
                {createBoardMutation.isPending ? 'Creating...' : 'Create Board'}
              </Button>
            </form>
          </Form>
        </div>
      </main>
  );
}
