'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import DetailPageHeader from '@/components/organisms/header/DetailPageHeader';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import {
  CREATE_GRADE_OPTIONS,
  CREATE_GENRE_OPTIONS,
} from '@/constants/productConstants';
import { validatePhotoForm } from '@/schema/photoSchema';
import { photoService } from '@/services/photoService';
import Title, { TitleBox } from '../molecules/Title';
import useAuth from '@/store/userStore';

// 커스텀 드롭다운 컴포넌트
function InputDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = optionValue => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="mb-[10px] block text-[16px] font-medium text-white">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-gray-500)] px-4 py-3 text-left text-[16px] text-white"
      >
        <span className={value ? 'text-white' : 'text-[var(--color-gray-200)]'}>
          {value || placeholder}
        </span>
        <Image
          src="/assets/icons/ic_down.svg"
          alt="arrow"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-black)]">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full px-4 py-3 text-left text-[16px] text-white transition-colors hover:bg-[var(--color-gray-500)]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <span className="mt-2 block text-[14px] text-[var(--color-red)]">
          {error}
        </span>
      )}
    </div>
  );
}

// 포토카드 생성/편집 페이지 컴포넌트
export default function MyPhotoEditPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { accessToken } = useAuth();

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
    mutationFn: formData => photoService.createPhoto(accessToken, formData),
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

  // 등급 선택
  const handleGradeSelect = value => {
    setFormData(prev => ({ ...prev, grade: value }));
    if (errors.grade) {
      setErrors(prev => ({ ...prev, grade: '' }));
    }
  };

  // 장르 선택
  const handleGenreSelect = value => {
    setFormData(prev => ({ ...prev, genre: value }));
    if (errors.genre) {
      setErrors(prev => ({ ...prev, genre: '' }));
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
    createPhotoMutation.mutate(submitData);
  };

  return (
    <div className="min-h-screen bg-[var(--color-black)] text-white">
      <TitleBox>
        <Title text={'포토카드 생성'} />
      </TitleBox>

      <div className="mx-auto max-w-[520px] px-4 py-8">
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
          <InputDropdown
            label="등급"
            value={formData.grade}
            options={CREATE_GRADE_OPTIONS}
            onChange={handleGradeSelect}
            placeholder="등급을 선택해 주세요"
            error={errors.grade}
          />

          {/* 장르 */}
          <InputDropdown
            label="장르"
            value={formData.genre}
            options={CREATE_GENRE_OPTIONS}
            onChange={handleGenreSelect}
            placeholder="장르를 선택해 주세요"
            error={errors.genre}
          />

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
            <Input
              name="quantity"
              type="number"
              label="총 발행량"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="발행량을 입력해 주세요 (1-10)"
              error={errors.quantity}
              min="1"
              max="10"
            />
            <p className="mt-2 text-[12px] text-[var(--color-red)]">
              총 발행량은 1개에서 10개 사이입니다.
            </p>
          </div>

          {/* 사진 업로드 */}
          <div>
            <label className="mb-[10px] block text-[16px] font-medium text-white">
              사진 업로드
            </label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex w-full items-center gap-4">
              <Input
                type="text"
                value={formData.image?.name || ''}
                placeholder="사진 업로드"
                readOnly
                className="w-full flex-1 rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-gray-500)] px-4 py-4 text-[16px] text-white placeholder:text-[var(--color-gray-300)]"
              />
              <button
                className="flex h-[60px] w-full max-w-[120px] items-center justify-center border-1 border-[var(--color-main)] text-[var(--color-main)]"
                onClick={handleImageButtonClick}
              >
                파일 선택
              </button>
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
              variant="primary"
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
