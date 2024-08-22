import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

export default function NFTTemplateForm() {
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-gray-200 px-4 py-3">
      <p className="font-semibold">Having trouble designing your template?</p>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-blue-500 text-white">
              Access here
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">NFT template</h4>
                <p className="text-muted-foreground text-sm">
                  Allow us to assist you in designing your NFT template
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="Firstname">First name</Label>
                    <Input id="Firstname" placeholder="First name" className="col-span-2 h-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="Lastname">Last name</Label>
                    <Input id="Lastname" placeholder="Last name" className="col-span-2 h-8" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Organizationname">Authorizing Organization name (option)</Label>
                  <Input
                    id="Organizationname"
                    placeholder="Authorizing Organization name"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Contact">Contact</Label>
                  <Input id="Contact" placeholder="Contact" className="col-span-2 h-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input type="email" id="Email" placeholder="Email" className="col-span-2 h-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Email">How you intend to utilize this NFT template?</Label>
                  <Textarea placeholder="Type your message here." />
                </div>
              </div>
              <Button variant="outline" className="bg-blue-500 text-white">
                Submit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
