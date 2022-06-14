import {fcl, FlowEnv, NFTClient} from './src';

async function main(){
  let c=new NFTClient()
  await c.bindFcl(fcl,FlowEnv.flowTestnet)
  c.bindAuth('0x7f3812b53dd4de20','7a437e23da24e7772896c556262fafa58af9fde12890be5f33509c8ce8b94e64')
  
  let ret
  ret = await c.getNFTs('MonoCat','0x7f3812b53dd4de20','0x7f3812b53dd4de20')
  console.log(`ret:`, ret);
  
}

main().catch(e=>{
  console.error(`e:`, e);
})
