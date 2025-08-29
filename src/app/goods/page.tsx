'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState } from 'react';
import { useGoodsStore } from '../../store/goods-store';
import ThreeScene from '@/components/postcard/ThreeScene';

export default function PostcardPreview() {
  const width = useGoodsStore((state) => state.width);
  const height = useGoodsStore((state) => state.height);
  const thickness = useGoodsStore((state) => state.thickness);
  const formats = useGoodsStore((state) => state.formats) || [];
  const [uploadedTextures, setUploadedTextures] = useState<{ [key: string]: string }>({});
  const lightX = useGoodsStore((state) => state.lightX);
  const lightY = useGoodsStore((state) => state.lightY);
  const lightZ = useGoodsStore((state) => state.lightZ);
  const lightIntensity = useGoodsStore((state) => state.lightIntensity);
  const [sideColor, setSideColor] = useState('#dddddd');
  const [format, setFormat] = useState('');
  const setWidth = useGoodsStore((state) => state.setWidth);
  const setHeight = useGoodsStore((state) => state.setHeight);
  const setThickness = useGoodsStore((state) => state.setThickness);
  const finishingList = useGoodsStore((state) => state.finishingList);
  const selectedFinishings = useGoodsStore((state) => state.selectedFinishings);
  const setSelectedFinishings = useGoodsStore((state) => state.setSelectedFinishings);

const handleImageUpload = (file: File, key: string) => {
  const newSelectedFinishings = selectedFinishings.map((finish) => {
    if (finish.value === key) {
      return { ...finish, image: URL.createObjectURL(file) };
    }
    return finish;
  });
  setSelectedFinishings(newSelectedFinishings);
};

  const handleFormatChange = (value: string) => {
    setFormat(value);
    if (value !== 'custom') {
      let index = parseInt(value);
      setWidth(formats[index].width);
      setHeight(formats[index].height);
    }
  }

  const handleFinishingsChange = (selected: Option[]) => {
    setSelectedFinishings(selected);
  }

  return (
    <div className="flex h-full bg-white">
      <ThreeScene/>
      <div className="w-100 px-6 py-4 overflow-y-scroll">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>基础设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 w-72">
              <Label className="block">预设尺寸 (mm)</Label>
              <Select value={format} onValueChange={handleFormatChange} defaultOpen >
                <SelectTrigger>
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formats.map((format, index) => <SelectItem value={index.toString()} key={index}>{format.label}</SelectItem>)}
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {(format === 'custom') && (
              <div className='flex flex-1 flex-horizontal'>
                {['width', 'height'].map((dim) => {
                  const value = dim === 'width' ? width : height;
                  const setter = dim === 'width' ? setWidth : setHeight;
                  return (
                    <div key={dim} className="mb-4 max-w-32">
                      <Label className="block capitalize">{dim}</Label>
                      <Input type="number" min="0" max="400" value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full mt-1 p-1 border" />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mb-4 max-w-32">
              <Label className="block">厚度 (mm)</Label>
              <Input type="number" min="0" max="1.5" step={0.1} value={thickness} onChange={(e) => setThickness(Number(e.target.value))} className="w-full mt-1 p-1 border" />
            </div>
            <div className="mb-4 max-w-72">
              <Label className="block capitalize">工艺</Label>
              <MultipleSelector
                value={selectedFinishings}
                defaultOptions={finishingList}
                hidePlaceholderWhenSelected
                onChange={(selected) => { handleFinishingsChange(selected) }}
                groupBy="group"
              />
            </div>
            <div className="mb-4 max-w-32">
              <Label className="block">侧边颜色</Label>
              <Input type="color" value={sideColor} onChange={(e) => setSideColor(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>图片上传</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedFinishings.map((key) => (
              key.image && <div key={key.label} className="mb-2">
                <Label className="block">{key.label}</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, key.value);
                    // if (file) handleImageUpload(`front-${key}`, file);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>环境设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label className="block">Light X</Label>
              <Input type="range" min="-10" max="10" step="0.1" value={lightX} onChange={(e) => useGoodsStore(state => { state.setLightX(Number(e.target.value)) })} />
            </div>
            <div className="mb-4">
              <Label className="block">Light Y</Label>
              <Input type="range" min="-10" max="10" step="0.1" value={lightY} onChange={(e) => useGoodsStore(state => { state.setLightY(Number(e.target.value)) })} />
            </div>
            <div className="mb-4">
              <Label className="block">Light Z</Label>
              <Input type="range" min="-10" max="10" step="0.1" value={lightZ} onChange={(e) => useGoodsStore(state => { state.setLightZ(Number(e.target.value)) })} />
            </div>
            <div className="mb-4">
              <Label className="block">Light Intensity:</Label>
              <Input type="range" min="0" max="5" step="0.1" value={lightIntensity} onChange={(e) => useGoodsStore(state => { state.setLightIntensity(Number(e.target.value)) })} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
