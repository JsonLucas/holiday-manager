-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_holiday_id_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_holiday_id_fkey` FOREIGN KEY (`holiday_id`) REFERENCES `Holiday`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
