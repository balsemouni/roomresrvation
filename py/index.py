from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize WebDriver
driver = webdriver.Chrome()
driver.maximize_window()

try:
    # ===== 1. LOGIN PROCESS =====
    print(" Starting test - Navigating to login page...")
    driver.get("http://localhost:4200")

    try:
        signin_link = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(),'Signin')]"))
        )
        signin_link.click()
        print("👉 Clicked Signin link")
    except:
        print("ℹ Login form already visible")

    # Fill in credentials
    print(" Filling credentials...")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "input[formcontrolname='email']"))
    ).send_keys("ounibalsem0@gmail.com")

    driver.find_element(By.CSS_SELECTOR, "input[formcontrolname='password']").send_keys("1234")

    print("🔘 Clicking login button...")
    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "a.button-link.btn-primary.btn"))
    ).click()

    # Handle login alert if present
    try:
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        print(f"🔔 Alert detected: {alert.text}")
        alert.accept()
        print("✅ Alert accepted")
    except:
        print("ℹ️ No alert detected after login")

    # Wait for redirection
    WebDriverWait(driver, 20).until(lambda d: "list" in d.current_url.lower())
    print(f"✅ Login successful! Current URL: {driver.current_url}")

    # ===== 2. ROOM RESERVATION =====
    try:
        print("⚠️ Trying to locate Reserve button...")
        reserve_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH,
                "//button[@ng-reflect-router-link='/reservation/67390829db38f72c7']"
            ))
        )
    except:
        print("❌ Could not find Reserve button")
        raise

    # Scroll and click
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", reserve_button)
    time.sleep(0.5)
    try:
        reserve_button.click()
    except:
        driver.execute_script("arguments[0].click();", reserve_button)

    print("👉 Clicked Reserve button for Library room")

    WebDriverWait(driver, 20).until(
        EC.url_contains("/reservation/")
    )
    print(f"📅 Arrived at reservation page: {driver.current_url}")

    # ===== 3. TEST INVALID TIME SELECTION =====
    print("⏰ Testing time validation...")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "date"))
    ).send_keys("2025-04-12")

    Select(driver.find_element(By.ID, "start-time")).select_by_visible_text("15:00")
    Select(driver.find_element(By.ID, "end-time")).select_by_visible_text("13:00")  # Invalid

    driver.find_element(By.CLASS_NAME, "submit-button").click()
    print("📤 Submitted reservation form")

    try:
        error_msg = WebDriverWait(driver, 5).until(
            EC.visibility_of_element_located((By.XPATH,
                "//*[contains(text(), 'Start time must be earlier') or contains(text(), 'invalid time selection')]"
            ))
        )
        print(f"✅ Test passed: Validation error displayed - '{error_msg.text}'")
    except:
        print("❌ Test failed: Expected validation error not found")
        driver.save_screenshot("validation_error_missing.png")
        raise

except Exception as e:
    print(f"❌ Test failed with exception: {e}")
    driver.save_screenshot("test_failure.png")
    raise

finally:
    input("🛑 Test complete. Press Enter to close browser...")
    driver.quit()
    print("🖥️ Browser closed. Test ended.")
