function DataBlock(o,r){this.numDataCodewords=o,this.codewords=r,this.__defineGetter__("NumDataCodewords",function(){return this.numDataCodewords}),this.__defineGetter__("Codewords",function(){return this.codewords})}DataBlock.getDataBlocks=function(o,r,e){if(o.length!=r.TotalCodewords)throw"ArgumentException";for(var t=r.getECBlocksForLevel(e),d=0,a=t.getECBlocks(),n=0;n<a.length;n++)d+=a[n].Count;for(var s=new Array(d),c=0,w=0;w<a.length;w++)for(var f=a[w],n=0;n<f.Count;n++){var l=f.DataCodewords,i=t.ECCodewordsPerBlock+l;s[c++]=new DataBlock(l,new Array(i))}for(var h=s[0].codewords.length,C=s.length-1;C>=0;){var u=s[C].codewords.length;if(u==h)break;C--}C++;for(var v=h-t.ECCodewordsPerBlock,g=0,n=0;n<v;n++)for(var w=0;w<c;w++)s[w].codewords[n]=o[g++];for(var w=C;w<c;w++)s[w].codewords[v]=o[g++];for(var k=s[0].codewords.length,n=v;n<k;n++)for(var w=0;w<c;w++){var B=w<C?n:n+1;s[w].codewords[B]=o[g++]}return s};