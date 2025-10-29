'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import DetailPageHeader from '@/components/organisms/header/DetailPageHeader';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import DropDown from '@/components/molecules/DropDown';
import {
  CREATE_GRADE_OPTIONS,
  CREATE_GENRE_OPTIONS,
} from '@/constants/productConstants';
import { validatePhotoForm } from '@/schema/photoSchema';
import { photoService } from '@/services/photoService';
import useAuth from '@/store/userStore';

// 포토카드 생성/편집 페이지 컴포넌트
export default function MyPhotoEditPage() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    grade: '',
    genre: '',
    price: '',
    quantity: 1,
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // 포토카드 생성 mutation
  const createPhotoMutation = useMutation({
    mutationFn: ({ formData: data, token }) =>
      photoService.createPhoto(data, token),
    onSuccess: response => {
      alert(response.message || '포토카드가 성공적으로 생성되었습니다!');
      router.push('/market/my-photo');
    },
    onError: error => {
      alert(error.message || '포토카드 생성에 실패했습니다.');
    },
  });

  // 입력값 변경 핸들러
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // 에러 제거
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  // 이미지 선택 버튼 클릭
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 등급 변경
  const handleGradeChange = option => {
    setFormData(prev => ({ ...prev, grade: option.value }));
    if (errors.grade) {
      setErrors(prev => ({ ...prev, grade: '' }));
    }
  };

  // 장르 변경
  const handleGenreChange = option => {
    setFormData(prev => ({ ...prev, genre: option.value }));
    if (errors.genre) {
      setErrors(prev => ({ ...prev, genre: '' }));
    }
  };

  // 수량 증가
  const handleQuantityIncrease = () => {
    if (formData.quantity < 10) {
      setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    }
  };

  // 수량 감소
  const handleQuantityDecrease = () => {
    if (formData.quantity > 1) {
      setFormData(prev => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  // 폼 제출
  const handleSubmit = async e => {
    e.preventDefault();

    // 유효성 검증
    const validationErrors = validatePhotoForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // FormData 생성
    const submitData = new FormData();
    submitData.append('image', formData.image);
    submitData.append('title', formData.title);
    submitData.append('grade', formData.grade);
    submitData.append('genre', formData.genre);
    submitData.append('price', formData.price);
    submitData.append('quantity', formData.quantity);
    if (formData.description) {
      submitData.append('description', formData.description);
    }

    // API 호출
    createPhotoMutation.mutate({ formData: submitData, token: accessToken });
  };

  return (
    <div className="min-h-screen bg-[var(--color-black)] text-white">
      <DetailPageHeader />
      <div className="mx-auto max-w-[830px] px-4 py-8">
        <h1 className="mb-12 border-b-2 border-white pb-4 text-left text-[32px] font-bold">
          포토카드 생성
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* 포토카드 이름 */}
          <div>
            <Input
              name="title"
              label="포토카드 이름"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="포토카드 이름을 입력해 주세요"
              error={errors.title}
            />
          </div>

          {/* 등급 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              등급
            </label>
            <DropDown
              options={CREATE_GRADE_OPTIONS}
              value={
                CREATE_GRADE_OPTIONS.find(
                  opt => opt.value === formData.grade,
                ) || {}
              }
              onChange={handleGradeChange}
              placeholder="등급을 선택해 주세요"
              fontSize="text-[16px]"
            />
            {errors.grade && (
              <span className="mt-2 block text-[14px] text-[var(--color-red)]">
                {errors.grade}
              </span>
            )}
          </div>

          {/* 장르 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              장르
            </label>
            <DropDown
              options={CREATE_GENRE_OPTIONS}
              value={
                CREATE_GENRE_OPTIONS.find(
                  opt => opt.value === formData.genre,
                ) || {}
              }
              onChange={handleGenreChange}
              placeholder="장르를 선택해 주세요"
              fontSize="text-[16px]"
            />
            {errors.genre && (
              <span className="mt-2 block text-[14px] text-[var(--color-red)]">
                {errors.genre}
              </span>
            )}
          </div>

          {/* 가격 */}
          <div>
            <Input
              name="price"
              type="number"
              label="가격"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="가격을 입력해 주세요"
              error={errors.price}
              min="0"
            />
          </div>

          {/* 총 발행량 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              총 발행량
            </label>
            <div className="flex w-[220px] items-center justify-between rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-gray-500)] px-4 py-4">
              <button
                type="button"
                onClick={handleQuantityDecrease}
                disabled={formData.quantity <= 1}
                className="disabled:opacity-30"
              >
                <Image
                  src="/assets/icons/ic_-.svg"
                  alt="- icon"
                  width={24}
                  height={24}
                />
              </button>
              <span className="text-[18px] font-medium">
                {formData.quantity}
              </span>
              <button
                type="button"
                onClick={handleQuantityIncrease}
                disabled={formData.quantity >= 10}
                className="disabled:opacity-30"
              >
                <Image
                  src="/assets/icons/ic_+.svg"
                  alt="+ icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.quantity && (
              <span className="mt-2 block text-[14px] text-[var(--color-red)]">
                {errors.quantity}
              </span>
            )}
            <p className="mt-2 text-[12px] text-[var(--color-red)]">
              총 발행량은 1개에서 10개 사이입니다.
            </p>
          </div>

          {/* 사진 업로드 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              사진 업로드
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={formData.image?.name || ''}
                placeholder="사진 업로드"
                readOnly
                className="flex-1 rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-gray-500)] px-4 py-3 text-[16px] text-white placeholder:text-[var(--color-gray-300)]"
              />
              <Button
                type="button"
                variant="primary"
                size="xs"
                thikness="thin"
                onClick={handleImageButtonClick}
              >
                파일 선택
              </Button>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  width={200}
                  height={200}
                  className="rounded-[2px] object-cover"
                />
              </div>
            )}
            {errors.image && (
              <span className="mt-2 block text-[14px] text-[var(--color-red)]">
                {errors.image}
              </span>
            )}
          </div>

          {/* 포토카드 설명 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              포토카드 설명
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="카드 설명을 입력해 주세요"
              className="h-[150px] w-full resize-none rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-gray-500)] px-4 py-3 text-[16px] text-white placeholder:text-[var(--color-gray-300)] focus:ring-1 focus:ring-[var(--color-main)] focus:outline-none"
            />
            {errors.description && (
              <span className="mt-2 block text-[14px] text-[var(--color-red)]">
                {errors.description}
              </span>
            )}
          </div>

          {/* 생성하기 버튼 */}
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="l"
              thikness="thick"
              disabled={createPhotoMutation.isPending}
            >
              {createPhotoMutation.isPending ? '생성 중...' : '생성하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
