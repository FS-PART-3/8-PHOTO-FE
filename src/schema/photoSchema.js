/**
 * 포토카드 생성 데이터 검증 스키마
 */
export const photoCreateSchema = {
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
    validate: value => {
      if (!value || value.trim().length === 0) {
        return '포토카드 이름을 입력해 주세요.';
      }
      if (value.length > 100) {
        return '포토카드 이름은 100자 이하로 입력해 주세요.';
      }
      return '';
    },
  },
  grade: {
    required: true,
    validate: value => {
      if (!value) {
        return '등급을 선택해 주세요.';
      }
      const validGrades = ['COMMON', 'RARE', 'SUPERRARE', 'LEGENDARY'];
      if (!validGrades.includes(value)) {
        return '올바른 등급을 선택해 주세요.';
      }
      return '';
    },
  },
  genre: {
    required: true,
    validate: value => {
      if (!value) {
        return '장르를 선택해 주세요.';
      }
      const validGenres = ['풍경', '인물', '도시', '자연'];
      if (!validGenres.includes(value)) {
        return '올바른 장르를 선택해 주세요.';
      }
      return '';
    },
  },
  price: {
    required: true,
    min: 0,
    validate: value => {
      if (value === '' || value === null || value === undefined) {
        return '포인트를 입력해 주세요.';
      }
      const numValue = Number(value);
      if (Number.isNaN(numValue)) {
        return '올바른 포인트를 입력해 주세요.';
      }
      if (numValue < 0) {
        return '포인트는 0 이상이어야 합니다.';
      }
      return '';
    },
  },
  quantity: {
    required: true,
    min: 1,
    max: 10,
    validate: value => {
      if (value === '' || value === null || value === undefined) {
        return '총 발행량을 입력해 주세요.';
      }
      const numValue = Number(value);
      if (Number.isNaN(numValue)) {
        return '올바른 발행량을 입력해 주세요.';
      }
      if (numValue < 1) {
        return '총 발행량은 최소 1개 이상이어야 합니다.';
      }
      if (numValue > 10) {
        return '총 발행량은 10개 이하여야 합니다.';
      }
      return '';
    },
  },
  description: {
    required: false,
    maxLength: 1000,
    validate: value => {
      if (value && value.length > 1000) {
        return '포토카드 설명은 1000자 이하로 입력해 주세요.';
      }
      return '';
    },
  },
  image: {
    required: true,
    validate: value => {
      if (!value) {
        return '이미지 파일은 필수입니다.';
      }
      return '';
    },
  },
};

/**
 * 폼 데이터 검증 함수
 */
export const validatePhotoForm = formData => {
  const errors = {};

  Object.keys(photoCreateSchema).forEach(field => {
    const schema = photoCreateSchema[field];
    const value = formData[field];

    if (schema.validate) {
      const error = schema.validate(value);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};
