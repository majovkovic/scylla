import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';

describe('FileField - Validation Rules', () => {
  const file = new File(['content'], 'example.png', { type: 'image/png' });

  it('should pass the IsFileRule when the value is a file', () => {
    const schema = scylla.object({
      file: scylla.file(),
    });

    const data = { file: [file] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsFileRule when the value is not a file', () => {
    const schema = scylla.object({
      file: scylla.file(),
    });

    const data = { file: 'not a file' };
    const errors = scylla.validate(schema, data);

    expect(errors.file).toContain(VALIDATION_ERROR_FILE_MESSAGES.IS_FILE);
  });

  it('should pass the MinFilesRule when there are the minimum number of files', () => {
    const schema = scylla.object({
      files: scylla.file().minFiles(2),
    });

    const data = {
      files: [
        file,
        new File(['content2'], 'example2.png', { type: 'image/png' }),
      ],
    };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinFilesRule when there are fewer than the minimum number of files', () => {
    const schema = scylla.object({
      files: scylla.file().minFiles(2),
    });

    const data = { files: [file] };
    const errors = scylla.validate(schema, data);

    expect(errors.files).toContain(VALIDATION_ERROR_FILE_MESSAGES.MIN_FILES);
  });

  it('should pass the MaxFilesRule when there are fewer or equal to the maximum number of files', () => {
    const schema = scylla.object({
      files: scylla.file().maxFiles(3),
    });

    const data = {
      files: [
        file,
        new File(['content2'], 'example2.png', { type: 'image/png' }),
      ],
    };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxFilesRule when there are more than the maximum number of files', () => {
    const schema = scylla.object({
      files: scylla.file().maxFiles(2),
    });

    const data = {
      files: [
        file,
        new File(['content2'], 'example2.png', { type: 'image/png' }),
        new File(['content3'], 'example3.png', { type: 'image/png' }),
      ],
    };
    const errors = scylla.validate(schema, data);

    expect(errors.files).toContain(VALIDATION_ERROR_FILE_MESSAGES.MAX_FILES);
  });

  it('should pass the MinFileSizeRule when file sizes are above the minimum', () => {
    const largeFile = new File(['this is a large content'], 'largeFile.png', {
      type: 'image/png',
    });

    const schema = scylla.object({
      files: scylla.file().minFileSize(10),
    });

    const data = { files: [largeFile] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinFileSizeRule when file sizes are below the minimum', () => {
    const smallFile = new File(['sm'], 'smallFile.png', { type: 'image/png' });

    const schema = scylla.object({
      files: scylla.file().minFileSize(10),
    });

    const data = { files: [smallFile] };
    const errors = scylla.validate(schema, data);

    expect(errors.files).toContain(
      VALIDATION_ERROR_FILE_MESSAGES.MIN_FILE_SIZE,
    );
  });

  it('should pass the MaxFilesSizeRule when the total file size is below the maximum', () => {
    const schema = scylla.object({
      files: scylla.file().maxFilesSize(500),
    });

    const data = {
      files: [
        file,
        new File(['content2'], 'example2.png', { type: 'image/png' }),
      ],
    };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxFilesSizeRule when the total file size exceeds the maximum', () => {
    const largeFile = new File(
      ['this is a large content exceeding limit'],
      'largeFile.png',
      {
        type: 'image/png',
      },
    );

    const schema = scylla.object({
      files: scylla.file().maxFilesSize(10),
    });

    const data = { files: [largeFile] };
    const errors = scylla.validate(schema, data);

    expect(errors.files).toContain(
      VALIDATION_ERROR_FILE_MESSAGES.MAX_FILES_SIZE,
    );
  });

  it('should pass the IsFileTypeRule when the file type is allowed', () => {
    const schema = scylla.object({
      files: scylla.file().fileType(['image/png']),
    });

    const data = { files: [file] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsFileTypeRule when the file type is not allowed', () => {
    const schema = scylla.object({
      files: scylla.file().fileType(['image/png']),
    });

    const data = {
      files: [new File(['content'], 'example.txt', { type: 'text/plain' })],
    };
    const errors = scylla.validate(schema, data);

    expect(errors.files).toContain(VALIDATION_ERROR_FILE_MESSAGES.IS_FILE_TYPE);
  });
});
